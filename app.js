(function () {
  const S = window.SITE;
  const app = document.getElementById("app");

  const LINE_SVG =
    '<svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><path fill="currentColor" d="M12 2.5C6.2 2.5 1.5 6.3 1.5 11c0 4.2 3.7 7.7 8.8 8.4.3.1.8.2.9.5.1.3.1.7 0 1l-.1.9c0 .3-.2 1 .9.5 1.1-.5 6-3.5 8.2-6 1.5-1.6 2.3-3.3 2.3-5.3 0-4.7-4.7-8.5-10.5-8.5zM8.1 13.6H6c-.3 0-.6-.3-.6-.6V8.9c0-.3.3-.6.6-.6s.6.3.6.6v3.5h1.5c.3 0 .6.3.6.6s-.3.6-.6.6zm2.1-.6c0 .3-.3.6-.6.6s-.6-.3-.6-.6V8.9c0-.3.3-.6.6-.6s.6.3.6.6V13zm5 0c0 .3-.2.5-.4.6h-.2c-.2 0-.4-.1-.5-.2l-2.1-2.9V13c0 .3-.3.6-.6.6s-.6-.3-.6-.6V8.9c0-.3.2-.5.4-.6h.2c.2 0 .4.1.5.3l2.1 2.9V8.9c0-.3.3-.6.6-.6s.6.3.6.6V13zm3.4-2.6c.3 0 .6.3.6.6s-.3.6-.6.6h-1.5v.9h1.5c.3 0 .6.3.6.6s-.3.6-.6.6H16c-.3 0-.6-.3-.6-.6V8.9c0-.3.3-.6.6-.6h2.1c.3 0 .6.3.6.6s-.3.6-.6.6h-1.5v.9h1.5z"/></svg>';
  const PHONE_SVG =
    '<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path fill="currentColor" d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1A17 17 0 0 1 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1l-2.3 2.2z"/></svg>';
  const PLAY_SVG = '<svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true"><path fill="currentColor" d="M8 5v14l11-7z"/></svg>';
  const ARROW = '<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path fill="currentColor" d="M13.2 5.3 19.9 12l-6.7 6.7-1.4-1.4 4.3-4.3H4v-2h12.1l-4.3-4.3z"/></svg>';

  const esc = (s) =>
    String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  // ---- media ----
  // ratio จาก config ใช้จองพื้นที่ก่อนรูปโหลด → masonry จัดได้ถูกตั้งแต่แรก
  const PH_RATIOS = ["3/4", "4/5", "1/1", "3/4", "2/3", "4/5"];
  function media(item, i, big) {
    const ratio = item.ratio || (item.src ? "" : PH_RATIOS[i % PH_RATIOS.length]);
    const style = ratio ? ` style="aspect-ratio:${ratio}"` : "";
    if (item.video) {
      return big
        ? `<video src="${esc(item.video)}" poster="${esc(item.src)}" controls autoplay muted loop playsinline${style}></video>`
        : `<video src="${esc(item.video)}" poster="${esc(item.src)}" muted loop playsinline preload="metadata" data-autoplay${style}></video>`;
    }
    if (item.src) return `<img src="${esc(item.src)}" alt="${esc(item.title || "")}" loading="lazy"${style} />`;
    return `<div class="ph"${style}><span>${esc(item.title)}</span><small>รอรูปจริง</small></div>`;
  }

  // ---- ติดต่อ ----
  // เปิดแชต LINE OA พร้อมข้อความที่กรอกไว้ (ใช้ได้แม้ลูกค้ายังไม่ได้แอด)
  function lineUrl(msgKey, vars) {
    let text = S.lineMessages[msgKey] || S.lineMessages.general;
    Object.entries(vars || {}).forEach(([k, v]) => (text = text.split(`{${k}}`).join(v)));
    return `https://line.me/R/oaMessage/${encodeURIComponent(S.lineId)}/?${encodeURIComponent(text)}`;
  }
  function lineButton(label, msgKey, vars, cls = "") {
    return `<a class="btn btn-line ${cls}" href="${esc(lineUrl(msgKey, vars))}" target="_blank" rel="noopener">${LINE_SVG}<span>${esc(label)}</span></a>`;
  }
  function phoneButtons() {
    return S.phones
      .map((p) => `<a class="btn btn-phone" href="tel:${esc(p.replace(/[^0-9+]/g, ""))}">${PHONE_SVG}<span>${esc(p)}</span></a>`)
      .join("");
  }

  // ---- pin grid ----
  // ctx.tagOf(item) → ป้ายบนรูป, ctx.orderOf(item) → [label, msgKey, vars] ของปุ่มสั่งบน pin
  function grid(items, ctx) {
    if (!items.length) return "";
    return `<div class="masonry" data-masonry>${items
      .map((it, i) => {
        const tag = ctx.tagOf(it);
        const [label, key, vars] = ctx.orderOf(it);
        return `
      <figure class="pin" data-idx="${i}">
        <div class="pin-media">
          ${media(it, i)}
          ${it.video ? `<span class="badge-video">${PLAY_SVG}</span>` : ""}
          ${tag ? `<span class="pin-tag">${esc(tag)}</span>` : ""}
          <a class="pin-order" href="${esc(lineUrl(key, vars))}" target="_blank" rel="noopener">${esc(label)}</a>
        </div>
        ${it.title ? `<figcaption>${esc(it.title)}</figcaption>` : ""}
      </figure>`;
      })
      .join("")}</div>`;
  }

  // ---------------- Views ----------------
  function viewHome() {
    const card = (key, href, cta) => {
      const c = S.home[key];
      const inner = c.cover ? `<img src="${esc(c.cover)}" alt="${esc(c.title)}" />` : `<div class="home-ph ${key}"></div>`;
      return `<a class="home-card" href="${href}">${inner}
        <div class="home-label"><h2>${esc(c.title)}</h2><p>${esc(c.subtitle)}</p><span class="home-cta">${cta} ${ARROW}</span></div></a>`;
    };
    app.innerHTML = `
      <section class="home-intro">
        <img class="intro-logo" src="images/brand/logo.png" alt="Hongkong Bowl" width="600" height="669" />
        <h1>อาหารสำหรับทุกงานของคุณ</h1>
        <p>จัดเลี้ยงงานอีเวนต์ · ข้าวกล่องสำหรับประชุมและออฟฟิศ</p>
      </section>
      <section class="home">${card("catering", "#/catering", "ดูผลงาน")}${card("foodbox", "#/foodbox", "ดูเมนู")}</section>
      ${shopInfo()}`;
  }

  // ---- ข้อมูลร้าน (หน้าแรก) ----
  const PIN_SVG = '<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path fill="currentColor" d="M12 2a7 7 0 0 0-7 7c0 5.2 7 13 7 13s7-7.8 7-13a7 7 0 0 0-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z"/></svg>';
  const CLOCK_SVG = '<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path fill="currentColor" d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm1 10.4 3.5 2.1-.8 1.3L11 13V7h2z"/></svg>';
  function shopInfo() {
    const sh = S.shop;
    const branches = sh.branches
      .map(
        (b) => `<li><b>${esc(b.name)}</b>${b.detail ? `<span>${esc(b.detail)}</span>` : ""}${
          b.map ? `<a class="link" href="${esc(b.map)}" target="_blank" rel="noopener">ดูแผนที่ →</a>` : ""
        }</li>`
      )
      .join("");
    return `
      <section class="shop-info">
        <div class="shop-about">
          <p class="eyebrow">เกี่ยวกับเรา</p>
          <h2>${esc(sh.tagline)}</h2>
          <p>${esc(sh.about)}</p>
          ${sh.rating ? `<span class="rating">${esc(sh.rating)}</span>` : ""}
        </div>
        <div class="shop-facts">
          <div class="fact"><span class="fact-ic">${CLOCK_SVG}</span><div><b>เวลาเปิด</b><span>${esc(sh.hours)}</span></div></div>
          <div class="fact"><span class="fact-ic">${PIN_SVG}</span><div><b>ที่ตั้งร้าน</b><ul class="branches">${branches}</ul></div></div>
          <div class="fact"><span class="fact-ic">${PHONE_SVG}</span><div><b>ติดต่อ / สั่งอาหาร</b>
            <span>LINE ${esc(S.lineId)}</span><span>${S.phones.map(esc).join(" · ")}</span></div></div>
          <div class="contact-row left">${lineButton("ทักไลน์", "general")}</div>
        </div>
      </section>`;
  }

  function renderFooter() {
    const socials = S.shop.socials.filter((s) => s.url);
    document.getElementById("footer").innerHTML = `
      <div class="footer-in">
        <img src="images/brand/logo.png" alt="Hongkong Bowl" width="96" height="107" />
        <div>
          <p class="footer-tag">${esc(S.shop.tagline)}</p>
          <p>${esc(S.shop.hours)} · ${S.shop.branches.map((b) => esc(b.name)).join(" · ")}</p>
          <p>LINE ${esc(S.lineId)} · ${S.phones.map(esc).join(" / ")}</p>
          ${socials.length ? `<p class="socials">${socials.map((s) => `<a href="${esc(s.url)}" target="_blank" rel="noopener">${esc(s.name)}</a>`).join("")}</p>` : ""}
        </div>
      </div>
      <p class="copy">© ${new Date().getFullYear()} Hongkong Bowl</p>`;
  }

  function viewCatering() {
    const c = S.catering;
    app.innerHTML = `
      <section class="banner">
        <p class="eyebrow">CATERING</p>
        <h1>${esc(c.headline)}</h1>
        <div class="offer-row">
          <div class="offer"><span class="offer-k">บูธบะหมี่</span><span class="offer-v">เริ่มต้น ฿10,000</span></div>
          <div class="offer"><span class="offer-k">งานบุฟเฟ่ต์</span><span class="offer-v">ทักไลน์เพื่อขอราคา</span></div>
        </div>
        <div class="contact-row">${lineButton("แอดไลน์ " + S.lineId, "catering")}${phoneButtons()}</div>
      </section>
      <h2 class="section-title">ผลงานที่ผ่านมา</h2>
      ${grid(c.items, {
        tagOf: (it) => it.note,
        orderOf: (it) => ["สอบถาม", "cateringPin", { title: it.title || "แบบในรูป" }],
      })}`;
    bindPins(c.items, null);
  }

  function viewFoodbox(tierId) {
    const F = S.foodbox;
    const tiers = F.tiers;
    const active = tiers.find((t) => t.id === tierId) ? tierId : "all";
    const items = active === "all" ? F.items : F.items.filter((it) => it.tier === active);
    const labelOf = (id) => (tiers.find((t) => t.id === id) || {}).label || id;
    const count = (id) => F.items.filter((it) => it.tier === id).length;

    app.innerHTML = `
      <section class="page-head">
        <h1>ข้าวกล่อง</h1>
        <p>เลือกราคาเพื่อดูเมนู · กดที่รูปเพื่อสั่งทางไลน์</p>
      </section>
      <nav class="tiers" aria-label="เลือกราคา">
        <a href="#/foodbox" class="chip ${active === "all" ? "on" : ""}">ทั้งหมด</a>
        ${tiers
          .map(
            (t) => `<a href="#/foodbox/${esc(t.id)}" class="chip ${t.id === "premium" ? "chip-premium" : ""} ${active === t.id ? "on" : ""} ${count(t.id) ? "" : "dim"}">${esc(t.label)}</a>`
          )
          .join("")}
      </nav>
      ${
        items.length
          ? grid(items, {
              tagOf: (it) => labelOf(it.tier),
              orderOf: (it) =>
                it.title
                  ? ["สั่งเมนูนี้", "foodboxPin", { tier: labelOf(it.tier), title: it.title }]
                  : ["สั่ง", "foodbox", { tier: labelOf(it.tier) }],
            })
          : `<div class="empty"><p>ยังไม่มีรูปเมนู ${esc(labelOf(active))}</p><p class="muted">ทักไลน์มาถามเมนูได้เลย</p>
             ${lineButton("ถามเมนู " + labelOf(active), "foodbox", { tier: labelOf(active) })}</div>`
      }
      <section class="cta-band">
        <h2>พร้อมสั่งแล้ว?</h2>
        <p>แจ้งจำนวนและวันที่รับทางไลน์ ทีมงานตอบกลับเร็ว</p>
        <div class="contact-row">${lineButton("สั่งข้าวกล่องทางไลน์", "foodbox", { tier: active === "all" ? "(ราคา ___ บาท)" : labelOf(active) })}${phoneButtons()}</div>
      </section>`;
    bindPins(items, labelOf);
  }

  // ---------------- Masonry (วางการ์ดลงคอลัมน์ที่เตี้ยที่สุด แบบ Pinterest) ----------------
  function colCount() {
    const w = window.innerWidth;
    return w <= 640 ? 2 : w <= 960 ? 3 : w <= 1280 ? 4 : 5;
  }
  let lastCols = 0;
  function layoutMasonry() {
    const box = app.querySelector("[data-masonry]");
    if (!box) return;
    const pins = [...box.querySelectorAll(".pin")].sort((a, b) => a.dataset.idx - b.dataset.idx);
    const cols = Array.from({ length: (lastCols = colCount()) }, () => {
      const c = document.createElement("div");
      c.className = "m-col";
      return c;
    });
    box.innerHTML = "";
    cols.forEach((c) => box.appendChild(c));
    pins.forEach((p) => cols.reduce((a, b) => (b.offsetHeight < a.offsetHeight ? b : a)).appendChild(p));
    watchVideos();
  }
  const relayout = () => colCount() !== lastCols && layoutMasonry();
  window.addEventListener("resize", relayout);
  if ("ResizeObserver" in window) new ResizeObserver(relayout).observe(document.documentElement);

  // คลิปในกริด: เล่นเฉพาะตอนอยู่บนจอ (ประหยัดเน็ตลูกค้า)
  const io =
    "IntersectionObserver" in window &&
    new IntersectionObserver(
      (entries) => entries.forEach((e) => (e.isIntersecting ? e.target.play().catch(() => {}) : e.target.pause())),
      { threshold: 0.4 }
    );
  function watchVideos() {
    if (io) app.querySelectorAll("video[data-autoplay]").forEach((v) => io.observe(v));
  }

  // ---------------- Lightbox ----------------
  const lb = document.getElementById("lightbox");
  const lbBody = lb.querySelector(".lb-body");
  function openLightbox(item, i, labelOf) {
    const price = labelOf ? labelOf(item.tier) : "";
    const heading = item.title || (labelOf ? `ข้าวกล่อง ${price}` : "งาน Catering");
    const cta = labelOf
      ? item.title
        ? lineButton("สั่งเมนูนี้ทางไลน์", "foodboxPin", { tier: price, title: item.title }, "btn-lg")
        : lineButton("สั่งข้าวกล่อง " + price, "foodbox", { tier: price }, "btn-lg")
      : lineButton("สอบถามงานแบบนี้", "cateringPin", { title: item.title || "แบบในรูป" }, "btn-lg");
    lbBody.innerHTML = `
      <div class="lb-media">${media(item, i, true)}</div>
      <div class="lb-info">
        ${price ? `<span class="lb-price">${esc(price)}</span>` : item.note ? `<span class="lb-price">${esc(item.note)}</span>` : ""}
        <h3>${esc(heading)}</h3>
        <p class="muted">${labelOf ? "แจ้งจำนวนกล่องและวันที่รับในแชตได้เลย" : "ทำตามงบประมาณลูกค้า · แจ้งจำนวนคนและวันที่จัดงาน"}</p>
        ${cta}
        <div class="lb-phones">${phoneButtons()}</div>
      </div>`;
    lb.hidden = false;
    document.body.style.overflow = "hidden";
  }
  function closeLightbox() {
    if (lb.hidden) return;
    lb.hidden = true;
    lbBody.innerHTML = ""; // หยุดคลิปที่เล่นอยู่
    document.body.style.overflow = "";
  }
  lb.addEventListener("click", (e) => {
    if (e.target === lb || e.target.closest(".lb-close")) closeLightbox();
  });
  document.addEventListener("keydown", (e) => e.key === "Escape" && closeLightbox());

  function bindPins(items, labelOf) {
    layoutMasonry();
    app.querySelectorAll(".pin").forEach((el) =>
      el.addEventListener("click", (e) => {
        if (e.target.closest(".pin-order")) return; // ปุ่มสั่งบน pin → ไปไลน์เลย
        const i = +el.dataset.idx;
        openLightbox(items[i], i, labelOf);
      })
    );
  }

  // ---------------- Router ----------------
  function route() {
    closeLightbox();
    const [, page, param] = (location.hash || "#/").split("/");
    document.querySelectorAll("[data-nav]").forEach((a) => a.classList.toggle("on", a.dataset.nav === page));
    if (page === "catering") viewCatering();
    else if (page === "foodbox") viewFoodbox(param);
    else viewHome();
    window.scrollTo(0, 0);
  }

  // ---------------- Init ----------------
  const fab = document.getElementById("fab-line");
  fab.href = lineUrl("general");
  fab.innerHTML = LINE_SVG;
  renderFooter();
  window.addEventListener("hashchange", route);
  route();
})();
