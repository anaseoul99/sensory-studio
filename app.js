const works = [
  {
    id: "animal",
    title: "Animal World",
    scent: "Yuzu Blend",
    tags: "Warm · Dreamlike · Imaginary yellow · Bright · Playful",
    image: "images/animal.jpg",
    sketch: "https://anaseoul99.github.io/animalworld/",
    track: "Through the Storm — Yeo Doll",
    copy: "따뜻한 밤 공간에 작은 동물들이 흩어져 있다. 밝은 노란 빛에서 키워드를 뽑고, 그 분위기의 곡과 p5.js 움직임을 만든 뒤 유자 블렌드를 붙였다."
  },
  {
    id: "season",
    title: "Season",
    scent: "Mineral",
    tags: "Calm · Sad · Wind · Cool · Blue",
    image: "images/season.jpg",
    sketch: "https://anaseoul99.github.io/season/",
    track: "Waves — Paige",
    copy: "푸른 하늘 위로 가지와 꽃이 겹친다. 차분함과 바람, 서늘한 색을 소리와 미네랄 향으로 옮긴다."
  },
  {
    id: "flower",
    title: "Flower Drop",
    scent: "Toffee",
    tags: "Vivid · Simple · Drop · Colorful · Wine",
    image: "images/flower.jpg",
    sketch: "https://anaseoul99.github.io/flowerdrop/",
    track: "Talking 'bout me — tillandtill",
    copy: "물방울 형태 안에 서로 다른 꽃이 들어 있다. 반복과 와인빛 색의 차이를 토피 향과 연결한다."
  },
  {
    id: "home",
    title: "Home",
    scent: "Cedarwood",
    tags: "Flower · Safe · Cloud · Cream · Rainbow",
    image: "images/home.png",
    sketch: "https://anaseoul99.github.io/flowering/",
    track: "Flowering — tillandtill",
    copy: "집, 구름, 무지개, 풀이 넓은 여백 위에 반복된다. 익숙한 형태가 주는 안온함을 시더우드로 옮긴다."
  },
  {
    id: "dream",
    title: "Dream",
    scent: "Clary Sage",
    tags: "Dark · Fantasy · Animal · Rainbow · Lovely",
    image: "images/dream.jpg",
    sketch: "https://anaseoul99.github.io/dream/",
    track: "In my dream — Yeo Doll",
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
        <p>그림의 키워드로 향 기록의 FrDesc를 찾고, 원본 사이트와 같이 첫 번째 결과를 올린다.</p>
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
  const matched = first ? hits(found.tags, first.frDesc) : [];
  const others = found.matches.slice(1);
  document.title = `${work.title} — Sensory Studio`;
  app.innerHTML = `
    <article class="detail">
      <div>
        <a class="back" href="#/work">← Work</a>
        <p class="scent-name">${esc(first ? first.nameEN : work.scent)}</p>
        <h1>${esc(work.title)}</h1>
        <p class="tags">${esc(found.tags.join(" · "))}</p>
        <p class="copy">${esc(work.copy)}</p>
        <p class="track"><span>선정한 곡</span>${esc(work.track)}</p>
        <div class="lookup">
          <p class="track"><span>키워드로 조회한 첫 기록</span>${esc(first ? `${first.nameKR || ""} · ${first.category || ""}` : "없음")}</p>
          <p class="fr">FrDesc ${esc(first ? first.frDesc : "")}</p>
          <p class="fr">걸린 키워드 ${esc(matched.join(", ") || "없음")}</p>
          <p class="summary">${esc(first ? first.summary : "")}</p>
          ${others.length ? `<p class="track"><span>같은 조건에 더 걸린 향</span>${esc(others.map((item) => item.nameEN).join(" · "))}</p>` : ""}
        </div>
      </div>
      <div class="stage">
        ${first && first.image ? `<figure class="frame"><figcaption>조회된 향</figcaption><img src="${esc(first.image)}" alt="${esc(first.nameEN)}" /></figure>` : ""}
        <figure class="frame">
          <figcaption>원본 그림</figcaption>
          <img src="${work.image}" alt="${esc(work.title)} 원본" />
        </figure>
        <figure class="frame">
          <figcaption>번역 · p5.js</figcaption>
          <iframe title="${work.title} 인터랙션" src="${work.sketch}"></iframe>
          <p class="hint">공개된 스케치다. 소리가 있게 만들려면 프레임 안을 클릭한다.</p>
        </figure>
      </div>
    </article>
  `;
}

function renderPerson() {
  document.title = "Person — Sensory Studio";
  app.innerHTML = `
    <section class="person">
      <div class="person-top">
        <iframe class="heart" title="Heart" src="https://anaseoul99.github.io/heart-profile/"></iframe>
        <p class="statement">I am a <em>developer</em> expanding my practice into media art, exploring how visual information can be <em>translated across senses.</em></p>
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
