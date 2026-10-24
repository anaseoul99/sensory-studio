const works = [
  {
    id: "animal",
    title: "Animal World",
    scent: "Yuzu Blend",
    tags: "Warm · Dreamlike · Imaginary yellow · Bright · Playful",
    image: "images/animal.jpg",
    sketch: "https://anaseoul99.github.io/animalworld/",
    track: "Through the Storm",
    artist: "Yeo Doll",
    soundTags: "Warm, Dreamlike, Bright, Playful",
    copy: "따뜻한 밤 공간에 작은 동물들이 흩어져 있다. 밝은 노란 빛에서 키워드를 뽑고, 그 분위기의 곡과 p5.js 움직임을 만든 뒤 유자 블렌드를 붙였다."
  },
  {
    id: "season",
    title: "Season",
    scent: "Mineral",
    tags: "Calm · Sad · Wind · Cool · Blue",
    image: "images/season.jpg",
    sketch: "https://anaseoul99.github.io/season/",
    track: "Waves",
    artist: "Paige",
    soundTags: "Calm, Wind",
    copy: "푸른 하늘 위로 가지와 꽃이 겹친다. 차분함과 바람, 서늘한 색을 소리와 미네랄 향으로 옮긴다."
  },
  {
    id: "flower",
    title: "Flower Drop",
    scent: "Toffee",
    tags: "Vivid · Simple · Drop · Colorful · Wine",
    image: "images/flower.jpg",
    sketch: "https://anaseoul99.github.io/flowerdrop/",
    track: "Talking 'bout me",
    artist: "tillandtill",
    soundTags: "Vivid, Simple, Wine",
    copy: "물방울 형태 안에 서로 다른 꽃이 들어 있다. 반복과 와인빛 색의 차이를 토피 향과 연결한다."
  },
  {
    id: "home",
    title: "Home",
    scent: "Cedarwood",
    tags: "Flower · Safe · Cloud · Cream · Rainbow",
    image: "images/home.png",
    sketch: "https://anaseoul99.github.io/flowering/",
    track: "Flowering",
    artist: "tillandtill",
    soundTags: "Flower, Safe, Cream",
    copy: "집, 구름, 무지개, 풀이 넓은 여백 위에 반복된다. 익숙한 형태가 주는 안온함을 시더우드로 옮긴다."
  },
  {
    id: "dream",
    title: "Dream",
    scent: "Clary Sage",
    tags: "Dark · Fantasy · Animal · Rainbow · Lovely",
    image: "images/dream.jpg",
    sketch: "https://anaseoul99.github.io/dream/",
    track: "In my dream",
    artist: "Yeo Doll",
    soundTags: "Fantasy, Lovely",
    copy: "어두운 하늘과 무지개 갈기의 유니콘. 명암의 대비와 환상적인 형태를 클라리 세이지로 옮긴다."
  }
];

const app = document.querySelector("#app");
let scents = {};

function esc(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function lookup(id) {
  return scents[id] || { tags: [], matches: [] };
}

function hits(tags, frDesc) {
  const hay = String(frDesc || "").toLowerCase();
  return tags.filter((tag) => hay.includes(tag.toLowerCase()));
}

function route() {
  const parts = (location.hash.replace(/^#/, "") || "/").split("/").filter(Boolean);
  const section = parts[0] || "project";
  document.body.dataset.page = section === "person" ? "person" : section === "work" ? "work" : "project";
  document.querySelectorAll("[data-nav]").forEach((link) => {
    const on = link.dataset.nav === (section === "work" ? "work" : section === "person" ? "person" : "project");
    if (on) link.setAttribute("aria-current", "page");
    else link.removeAttribute("aria-current");
  });
  if (section === "work" && parts[1]) renderDetail(parts[1]);
  else if (section === "work") renderWork();
  else if (section === "person") renderPerson();
  else renderProject();
  window.scrollTo(0, 0);
}

function renderProject() {
  document.title = "Sensory Studio";
  app.innerHTML = `
    <section class="project">
      <div class="project-title">
        <h1 class="display">Visual<br />To<br />Scent</h1>
        <div class="marquee">
          <div class="marquee-track">
            <span>Sensory Studio</span><span>Sensory Studio</span><span>Sensory Studio</span><span>Sensory Studio</span>
          </div>
        </div>
      </div>
      <aside class="project-side">
        <img class="logo" src="images/logo.png" alt="" />
        <p class="year">© 2026</p>
        <p class="lead"><strong>Sensory Studio explores how visual information can be translated across different senses.</strong></p>
        <p class="lead">Beginning with children’s drawings as its first visual source, the project translates visual characteristics such as color, form, repetition, and density into interactive and olfactory experiences.</p>
        <p class="lead">시각 정보를 인터랙션과 향으로 번역하며, 하나의 이미지가 다른 감각을 통과할 때 어떻게 다르게 경험되는지를 탐구한다.</p>
        <p class="ask">How does an image change when experienced through another sense?</p>
        <p class="ask-ko">이미지는 다른 감각을 통과할 때 어떻게 다르게 경험되는가?</p>
        <div class="modes"><span>Visual</span><span>Interactive</span><span>Scent</span></div>
      </aside>
    </section>
  `;
}

function renderWork() {
  document.title = "Work — Sensory Studio";
  app.innerHTML = `
    <section class="work">
      <div class="work-head">
        <h1>Work</h1>
      </div>
      <div class="grid">
        ${works.map((work) => {
          const found = lookup(work.id);
          const first = found.matches[0];
          const name = first ? first.nameEN : work.scent;
          return `
          <a class="card" href="#/work/${work.id}">
            <figure><img src="${work.image}" alt="${esc(work.title)} 원본 그림" /></figure>
            <div class="card-meta">
              <div class="scent">${esc(name)}</div>
              <h2>${esc(work.title)}</h2>
              <p>${esc(found.tags.join(" · "))}</p>
            </div>
          </a>`;
        }).join("")}
      </div>
    </section>
    ${siteFoot()}
  `;
}

function renderDetail(id) {
  const work = works.find((item) => item.id === id);
  if (!work) {
    renderWork();
    return;
  }
  const found = lookup(work.id);
  const first = found.matches[0];
  document.title = `${work.title} — Sensory Studio`;
  app.innerHTML = `
    <article class="detail">
      <div>
        <a class="back" href="#/work">← Work</a>
        <p class="scent-name">${esc(first ? first.nameEN : work.scent)}</p>
        <h1>${esc(work.title)}</h1>
        <p class="tags">${esc(found.tags.join(" · "))}</p>
        <p class="copy">${esc(work.copy)}</p>
        <div class="process">
          <div class="tech-grid">
            <button class="tech-item" type="button" data-step="js">${iconJs()}<span>JavaScript</span></button>
            <button class="tech-item" type="button" data-step="p5">${iconP5()}<span>p5.js</span></button>
            <button class="tech-item" type="button" data-step="airtable">${iconAirtable()}<span>DB</span></button>
            <button class="tech-item" type="button" data-step="audio">${iconAudio()}<span>Sound</span></button>
            <button class="tech-item" type="button" data-step="olfactory">${iconScent()}<span>Olfactory</span></button>
          </div>
          <div class="process-pop" hidden></div>
        </div>
      </div>
      <div class="stage">
        <figure class="plate">
          <div class="sketch-clip">
            <iframe title="${work.title} 인터랙션" src="${work.sketch}" scrolling="no"></iframe>
          </div>
          <figcaption><span>p5.js</span> 그 그림을 움직임으로 옮긴 스케치. 소리를 들으려면 화면을 클릭한다.</figcaption>
        </figure>
        <figure class="plate">
          <img src="${work.image}" alt="${esc(work.title)} 원본" />
          <figcaption><span>원본</span> 아이가 그린 그림. 색, 형태, 반복을 여기서 읽는다.</figcaption>
        </figure>
      </div>
    </article>
    ${siteFoot()}
  `;
  bindProcess(work, first);
}

function popupBody(work, step, scent) {
  const id = work.id;
  if (step === "js") {
    return `<img src="images/process/js.png" alt="데이터베이스 조회 코드" /><p>Javascript</p>`;
  }
  if (step === "p5") {
    return `<img src="images/process/${id}-p5.png" alt="p5.js로 그린 인터랙션" /><p>p5.js</p>`;
  }
  if (step === "airtable") {
    return `<img src="images/process/${id}-airtable.jpg" alt="키워드로 향 기록을 찾은 화면" /><p>DB</p>`;
  }
  if (step === "audio") {
    return `
      <div class="sound-card">
        <img src="images/process/${id}-cover.jpg" alt="" />
        <div>
          <strong>${esc(work.track)}</strong>
          <span>${esc(work.artist)}</span>
          <em>${esc(work.soundTags)}</em>
        </div>
      </div>`;
  }
  const name = scent ? scent.nameEN : work.scent;
  const image = scent && scent.image ? `<img src="${esc(scent.image)}" alt="${esc(name)}" />` : "";
  const summary = scent ? scent.summary : "";
  return `<p class="pop-name">${esc(name)}</p>${image}<p class="summary">${esc(summary)}</p>`;
}

function bindProcess(work, scent) {
  const root = document.querySelector(".process");
  const pop = root.querySelector(".process-pop");
  root.querySelectorAll(".tech-item").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      const open = button.classList.contains("is-open");
      root.querySelectorAll(".tech-item").forEach((item) => item.classList.remove("is-open"));
      if (open) {
        pop.hidden = true;
        pop.innerHTML = "";
        return;
      }
      button.classList.add("is-open");
      pop.innerHTML = popupBody(work, button.dataset.step, scent);
      pop.hidden = false;
    });
  });
  if (window.__closeProcess) document.removeEventListener("click", window.__closeProcess);
  window.__closeProcess = (event) => {
    if (event.target.closest(".process")) return;
    root.querySelectorAll(".tech-item").forEach((item) => item.classList.remove("is-open"));
    pop.hidden = true;
  };
  document.addEventListener("click", window.__closeProcess);
}

function siteFoot() {
  return `<footer class="site-foot"><span>© 2026</span><span>Sensory Studio</span><svg class="foot-mark" viewBox="0 0 80 72" aria-hidden="true"><path d="M40 5 L75 67 H5 Z" fill="none" stroke="currentColor" stroke-width="3.4" stroke-linejoin="round"></path><circle cx="40" cy="44" r="7" fill="#e21878"></circle></svg></footer>`;
}

function iconJs() {
  return `<svg viewBox="0 0 24 24" aria-hidden="true"><rect fill="#e21878" height="24" rx="4" width="24"></rect><text fill="#fff" font-size="11" font-weight="700" x="4.5" y="16.5">JS</text></svg>`;
}
function iconP5() {
  return `<svg viewBox="0 0 24 24" aria-hidden="true" fill="#e21878"><polygon points="12,2 17.5,10.5 6.5,10.5"></polygon><circle cx="7" cy="16.5" r="4.2"></circle><rect height="8" rx="1.5" width="8" x="12.5" y="12.2"></rect></svg>`;
}
function iconAirtable() {
  return `<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="#e21878" stroke-width="2.2"><ellipse cx="12" cy="5" rx="9" ry="3"></ellipse><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path></svg>`;
}
function iconAudio() {
  return `<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="#e21878" stroke-width="2"><path d="M3 14h3v-3h4V7h4v8h3v3h4"></path></svg>`;
}
function iconScent() {
  return `<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="#e21878" stroke-width="1.8"><path d="M12 20c-3-2-5-4.5-5-8a5 5 0 0 1 10 0c0 3.5-2 6-5 8z"></path><path d="M12 12V4"></path></svg>`;
}

function renderPerson() {
  document.title = "Person — Sensory Studio";
  app.innerHTML = `
    <section class="person">
        <div class="self">
          <div class="turn">
            <div class="turn-spin">
              <figure class="turn-face portrait">
                <img class="portrait-blur" src="images/person.jpg" alt="" />
                <img class="portrait-lips" src="images/person.jpg" alt="얼굴은 흐리고 입술만 남긴 사진" />
              </figure>
              <div class="turn-face turn-heart">
                <iframe class="heart" title="Heart" scrolling="no" src="https://anaseoul99.github.io/heart-profile/"></iframe>
              </div>
            </div>
          </div>
          <p class="scent-name">Developer</p>
          <p class="person-keys">Multimedia · Engineer · Fig Lip · Olfactory · Sound · Web</p>
        </div>
        <div class="intro">
          <p class="statement">I am a developer<br>expanding my practice into media art,<br>exploring how visual information can be<br><em>translated across senses.</em></p>
          <p class="statement-ko">웹을 만들어 온 사람입니다.<br>오랫동안 그 일에 대해 고민해왔고 이제는 듣고 맡게 합니다.</p>
        </div>
      <div class="cols">
        <div>
          <h2>Contact</h2>
          <p>Seoul, Korea</p>
          <p><a href="mailto:jiunsu2@naver.com">jiunsu2@naver.com</a></p>
        </div>
        <div>
          <h2>Study</h2>
          <ul>
            <li>Multimedia Engineering (B.A. · Seoul)</li>
            <li>Digital Contents (B.A. · Seoul)</li>
            <li>Culture Technology (Completed · Vancouver)</li>
            <li>Sound Design for Visual Media (Diploma · Vancouver)</li>
            <li>Programming &amp; Database (Cert.)</li>
            <li>UI / UX Design (Google Cert.)</li>
            <li>Olfactory &amp; Perfumery (Cert.)</li>
          </ul>
        </div>
        <div>
          <h2>Experience</h2>
          <ul>
            <li>13+ years in web development</li>
            <li>Digital interfaces · interactive media</li>
            <li>20+ digital projects</li>
            <li>Websites · digital services · interactive experiences</li>
            <li>International project · Korea · Türkiye</li>
          </ul>
        </div>
      </div>
    </section>
    ${siteFoot()}
    <audio id="site-bgm" preload="auto">
      <source src="audio/person.mp3" type="audio/mpeg" />
    </audio>
  `;
  const audio = document.getElementById("site-bgm");
  if (!audio) return;
  audio.volume = 0.25;
  const start = () => {
    if (!audio.paused || audio.ended) return;
    audio.play().catch(() => {});
  };
  start();
  ["pointerdown", "keydown", "touchstart"].forEach((eventName) => {
    document.addEventListener(eventName, start, { once: true, passive: true });
  });
}

window.addEventListener("hashchange", route);
fetch("scents.json")
  .then((response) => response.json())
  .then((data) => {
    scents = data;
    route();
  })
  .catch(() => route());
