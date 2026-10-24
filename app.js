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
      <div>
        <p class="year">© 2026</p>
        <h1 class="display">Visual<br />To<br />Scent<em>Sensory Studio</em></h1>
      </div>
      <div>
        <p class="lead">시각 정보를 움직임과 향으로 옮기는 스튜디오. 첫 재료는 어린이 그림이다. 색, 형태, 반복, 밀도를 인터랙션과 향으로 바꾼다.</p>
        <p class="lead en">Sensory Studio explores how visual information can be translated across different senses.</p>
        <p class="ask">이미지는 다른 감각을 통과할 때 어떻게 달라지는가?<span>How does an image change when experienced through another sense?</span></p>
        <div class="modes"><span>Visual</span><span>Interactive</span><span>Scent</span></div>
      </div>
    </section>
    <p class="note">가상으로 다시 짠 화면. 원본은 sensory-studio.work</p>
  `;
}

function renderWork() {
  document.title = "Work — Sensory Studio";
  app.innerHTML = `
    <section class="work">
      <div class="work-head">
        <h1>Work</h1>
        <p>다섯 작품이다. 향 이름이 제목과 함께 보이고, 카드를 열면 원본 그림과 p5.js 번역이 한 화면에 있다.</p>
      </div>
      <div class="grid">
        ${works.map((work) => `
          <a class="card" href="#/work/${work.id}">
            <figure><img src="${work.image}" alt="${work.title} 원본 그림" /></figure>
            <div class="card-meta">
              <div class="scent">${work.scent}</div>
              <h2>${work.title}</h2>
              <p>${work.tags}</p>
            </div>
          </a>
        `).join("")}
      </div>
    </section>
    <p class="note">가상으로 다시 짠 화면. 원본은 sensory-studio.work</p>
  `;
}

function renderDetail(id) {
  const work = works.find((item) => item.id === id);
  if (!work) {
    renderWork();
    return;
  }
  document.title = `${work.title} — Sensory Studio`;
  app.innerHTML = `
    <article class="detail">
      <div>
        <a class="back" href="#/work">← Work</a>
        <p class="scent-name">${work.scent}</p>
        <h1>${work.title}</h1>
        <p class="tags">${work.tags}</p>
        <p class="copy">${work.copy}</p>
        <p class="track"><span>선정한 곡</span>${work.track}</p>
        <ol class="steps">
          <li><b>1</b><span>그림에서 색과 형태를 읽는다</span></li>
          <li><b>2</b><span>감각 태그 다섯 개로 줄인다</span></li>
          <li><b>3</b><span>곡과 p5.js 움직임으로 확장한다</span></li>
          <li><b>4</b><span>같은 태그에 향 하나를 붙인다</span></li>
        </ol>
      </div>
      <div class="stage">
        <figure class="frame">
          <figcaption>원본 그림</figcaption>
          <img src="${work.image}" alt="${work.title} 원본" />
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
      <p class="statement">I am a <em>developer</em> expanding my practice into media art, exploring how visual information can be <em>translated across senses.</em></p>
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
    <p class="note">가상으로 다시 짠 화면. 원본은 sensory-studio.work</p>
  `;
}

window.addEventListener("hashchange", route);
route();
