import { useState, useRef, useEffect } from "react";

// ── カラー定数 ──────────────────────────────────────
const G = {
  main: "#22c55e",
  dark: "#15803d",
  mid:  "#16a34a",
  light:"#dcfce7",
  bg:   "#f0fdf4",
  text: "#14532d",
  line: "#06C755",
};

// ── マスコットSVG ───────────────────────────────────
function Mascot({ size = 80, style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 120" fill="none" style={style}>
      {/* 体 */}
      <ellipse cx="50" cy="75" rx="30" ry="32" fill={G.main}/>
      {/* 頭 */}
      <circle cx="50" cy="38" r="28" fill={G.main}/>
      {/* 大きな目 */}
      <circle cx="50" cy="37" r="18" fill="white" stroke="#14532d" strokeWidth="1.5"/>
      <circle cx="50" cy="37" r="11" fill="#1a1a2e"/>
      <circle cx="55" cy="32" r="4" fill="white"/>
      {/* アンテナ */}
      <line x1="50" y1="10" x2="50" y2="0" stroke={G.dark} strokeWidth="3" strokeLinecap="round"/>
      <circle cx="50" cy="0" r="4" fill={G.dark}/>
      {/* 耳/センサー */}
      <rect x="20" y="32" width="6" height="10" rx="3" fill={G.dark}/>
      <rect x="74" y="32" width="6" height="10" rx="3" fill={G.dark}/>
      {/* 腕 */}
      <ellipse cx="20" cy="78" rx="7" ry="14" rx2="7" fill={G.main} transform="rotate(-10 20 78)"/>
      <ellipse cx="80" cy="78" rx="7" ry="14" fill={G.main} transform="rotate(10 80 78)"/>
      {/* 足 */}
      <ellipse cx="38" cy="104" rx="10" ry="8" fill={G.dark}/>
      <ellipse cx="62" cy="104" rx="10" ry="8" fill={G.dark}/>
      {/* 胸のロゴマーク */}
      <rect x="38" y="65" width="24" height="20" rx="4" fill="white" opacity="0.4"/>
    </svg>
  );
}

// ── LINEロゴSVG ─────────────────────────────────────
function LineIcon({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="white">
      <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63h2.386c.349 0 .63.285.63.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.105.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63.349 0 .631.285.631.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.281.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314"/>
    </svg>
  );
}

// ── CTAボタン ───────────────────────────────────────
function LineBtn({ label = "今すぐ無料相談 →", large = false, style = {} }) {
  const sz = large ? { padding: "16px 32px", fontSize: 18, borderRadius: 50 } : { padding: "13px 24px", fontSize: 15, borderRadius: 50 };
  return (
    <a
      href="https://line.me"
      style={{
        display: "inline-flex", alignItems: "center", gap: 10,
        background: G.line, color: "white", fontWeight: 800,
        textDecoration: "none", boxShadow: "0 4px 16px rgba(6,199,85,0.4)",
        width: "100%", justifyContent: "center",
        ...sz, ...style,
      }}
    >
      <LineIcon size={large ? 24 : 20} />
      {label}
    </a>
  );
}

// ── セクションラッパー ──────────────────────────────
function Section({ id, bg = "white", children, style = {} }) {
  return (
    <section
      id={id}
      style={{
        background: bg,
        padding: "48px 20px",
        position: "relative",
        overflow: "hidden",
        ...style,
      }}
    >
      {children}
    </section>
  );
}

// ── セクション見出し ────────────────────────────────
function SectionTitle({ en, ja, color = G.main }) {
  return (
    <div style={{ textAlign: "center", marginBottom: 32 }}>
      <div style={{ fontSize: 36, fontWeight: 900, color, letterSpacing: 2, lineHeight: 1 }}>{en}</div>
      {ja && <div style={{ fontSize: 13, color: "#6b7280", marginTop: 6, letterSpacing: 1 }}>{ja}</div>}
    </div>
  );
}

// ── POINTカード ─────────────────────────────────────
function PointCard({ num, title, children, icon }) {
  return (
    <div style={{
      background: "white",
      borderRadius: 16,
      padding: "20px 18px",
      marginBottom: 16,
      boxShadow: "0 2px 12px rgba(0,0,0,0.07)",
      border: `1px solid ${G.light}`,
    }}>
      <div style={{ display: "flex", alignItems: "flex-start", gap: 12, marginBottom: 12 }}>
        <div style={{
          background: G.main, color: "white",
          borderRadius: 8, padding: "4px 10px",
          fontSize: 11, fontWeight: 900, lineHeight: 1.2,
          textAlign: "center", minWidth: 42, flexShrink: 0,
        }}>
          <div style={{ fontSize: 8 }}>POINT</div>
          <div style={{ fontSize: 20 }}>{String(num).padStart(2, "0")}</div>
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#1a1a1a", lineHeight: 1.4 }}
            dangerouslySetInnerHTML={{ __html: title }}
          />
        </div>
        {icon && <div style={{ fontSize: 32 }}>{icon}</div>}
      </div>
      {children}
    </div>
  );
}

// ── STEPカード ──────────────────────────────────────
function StepCard({ num, label, icon, last = false }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div style={{
        display: "flex", alignItems: "center", gap: 14,
        background: "white", borderRadius: 14, padding: "16px 20px",
        width: "100%", boxShadow: "0 2px 10px rgba(0,0,0,0.06)",
        border: `1px solid ${G.light}`,
      }}>
        <div style={{
          width: 52, height: 52, borderRadius: "50%",
          background: `linear-gradient(135deg, ${G.main}, ${G.dark})`,
          display: "flex", flexDirection: "column", alignItems: "center",
          justifyContent: "center", flexShrink: 0,
        }}>
          <div style={{ fontSize: 8, color: "white", fontWeight: 700, opacity: 0.85 }}>STEP</div>
          <div style={{ fontSize: 18, color: "white", fontWeight: 900, lineHeight: 1 }}>{String(num).padStart(2, "0")}</div>
        </div>
        <div style={{ fontSize: 16, fontWeight: 700, color: "#1a1a1a", flex: 1 }}>{label}</div>
        <div style={{ fontSize: 28 }}>{icon}</div>
      </div>
      {!last && (
        <div style={{ width: 2, height: 20, background: `${G.main}60`, margin: "4px 0", borderRadius: 2 }} />
      )}
    </div>
  );
}

// ── FAQアイテム ─────────────────────────────────────
function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{
      background: "white", borderRadius: 12, marginBottom: 10,
      border: `1px solid ${open ? G.main : "#e5e7eb"}`,
      overflow: "hidden", transition: "border-color 0.2s",
    }}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          width: "100%", background: "none", border: "none",
          padding: "14px 16px", cursor: "pointer",
          display: "flex", alignItems: "center", gap: 10, textAlign: "left",
        }}
      >
        <span style={{
          color: G.main, fontWeight: 800, fontSize: 16, flexShrink: 0
        }}>Q.</span>
        <span style={{ flex: 1, fontSize: 14, fontWeight: 600, color: "#1a1a1a", lineHeight: 1.4 }}>{q}</span>
        <span style={{
          width: 24, height: 24, borderRadius: "50%",
          border: `2px solid ${G.main}`, color: G.main,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 16, fontWeight: 700, flexShrink: 0,
          transform: open ? "rotate(45deg)" : "none",
          transition: "transform 0.2s",
        }}>+</span>
      </button>
      {open && (
        <div style={{
          padding: "0 16px 14px 16px",
          fontSize: 13, color: "#4b5563", lineHeight: 1.7,
          borderTop: `1px solid ${G.light}`,
          paddingTop: 12,
        }}>
          <span style={{ color: G.main, fontWeight: 700, marginRight: 6 }}>A.</span>{a}
        </div>
      )}
    </div>
  );
}

// ── メインLP ────────────────────────────────────────
export default function SwipeLP() {
  const topRef = useRef(null);

  // ヘッダーナビ用
  const [menuOpen, setMenuOpen] = useState(false);
  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <div style={{
      fontFamily: "'Hiragino Sans', 'Noto Sans JP', 'Segoe UI', sans-serif",
      background: "white",
      maxWidth: 480,
      margin: "0 auto",
      position: "relative",
    }} ref={topRef}>

      {/* ── ヘッダー ────────────────────────────────── */}
      <header style={{
        position: "sticky", top: 0, zIndex: 200,
        background: "white", borderBottom: "1px solid #e5e7eb",
        padding: "10px 16px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        {/* ロゴ */}
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <svg width="28" height="28" viewBox="0 0 40 40" fill="none">
            <rect x="4" y="20" width="14" height="16" rx="2" fill={G.main}/>
            <rect x="22" y="12" width="14" height="24" rx="2" fill={G.dark}/>
            <polygon points="2,22 20,6 38,22" fill={G.main} opacity="0.7"/>
          </svg>
          <div>
            <div style={{ fontSize: 13, fontWeight: 900, color: "#1a1a1a", letterSpacing: 1, lineHeight: 1 }}>NORTH HOUSE</div>
            <div style={{ fontSize: 8, color: "#6b7280", letterSpacing: 1 }}>REAL ESTATE</div>
          </div>
        </div>
        {/* ハンバーガー */}
        <button
          onClick={() => setMenuOpen(o => !o)}
          style={{ background: "none", border: "none", cursor: "pointer", padding: 4 }}
        >
          <div style={{ width: 22, height: 2, background: "#374151", marginBottom: 5, borderRadius: 2 }} />
          <div style={{ width: 22, height: 2, background: "#374151", marginBottom: 5, borderRadius: 2 }} />
          <div style={{ width: 22, height: 2, background: "#374151", borderRadius: 2 }} />
        </button>
      </header>

      {/* ドロワーメニュー */}
      {menuOpen && (
        <div style={{
          position: "fixed", inset: 0, zIndex: 300,
          background: "rgba(0,0,0,0.5)",
        }} onClick={() => setMenuOpen(false)}>
          <div style={{
            position: "absolute", top: 0, right: 0,
            width: 220, height: "100%",
            background: "white", padding: "60px 24px 24px",
            display: "flex", flexDirection: "column", gap: 4,
          }} onClick={e => e.stopPropagation()}>
            <button onClick={() => setMenuOpen(false)} style={{
              position: "absolute", top: 16, right: 16,
              background: "none", border: "none", fontSize: 22, cursor: "pointer", color: "#374151",
            }}>✕</button>
            {[
              ["hero", "TOP"],
              ["reviews", "口コミ"],
              ["fee", "仲介手数料0円"],
              ["points", "選ばれる理由"],
              ["office", "店舗案内"],
              ["flow", "ご利用の流れ"],
              ["faq", "よくある質問"],
              ["contact", "お問い合わせ"],
            ].map(([id, label]) => (
              <button key={id} onClick={() => scrollTo(id)} style={{
                background: "none", border: "none", cursor: "pointer",
                textAlign: "left", padding: "12px 0",
                fontSize: 14, fontWeight: 600, color: "#374151",
                borderBottom: "1px solid #f3f4f6",
              }}>{label}</button>
            ))}
          </div>
        </div>
      )}

      {/* ── Section 1: Hero ─────────────────────────── */}
      <section id="hero" style={{
        background: `linear-gradient(160deg, white 55%, ${G.bg} 100%)`,
        padding: "32px 20px 40px",
        position: "relative",
        overflow: "hidden",
      }}>
        {/* 背景装飾 */}
        <div style={{
          position: "absolute", top: -40, right: -40,
          width: 200, height: 200, borderRadius: "50%",
          background: `${G.main}08`,
        }} />

        {/* キャッチコピー */}
        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{ marginBottom: 16 }}>
            <span style={{ fontSize: 32, fontWeight: 900, color: G.main }}>札幌</span>
            <span style={{ fontSize: 28, fontWeight: 800, color: "#1a1a1a" }}>で</span>
            <br />
            <span style={{
              fontSize: 36, fontWeight: 900, color: "#1a1a1a",
              background: `linear-gradient(90deg, ${G.main}, ${G.dark})`,
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            }}>"損しない"</span>
            <br />
            <span style={{ fontSize: 30, fontWeight: 800, color: "#1a1a1a" }}>お部屋探し</span>
          </div>

          <p style={{ fontSize: 14, color: "#4b5563", lineHeight: 1.7, marginBottom: 20 }}>
            新生活の「気になる」は<br />
            <strong style={{ color: G.dark }}>NORTH HOUSE</strong> にまとめてお任せ。
          </p>

          {/* 仲介手数料0円バッジ */}
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            background: "white", borderRadius: 16, padding: "12px 20px",
            boxShadow: "0 4px 20px rgba(34,197,94,0.2)",
            border: `2px solid ${G.light}`,
            marginBottom: 24,
          }}>
            <Mascot size={48} />
            <div>
              <div style={{ fontSize: 11, color: "#6b7280", fontWeight: 600 }}>仲介手数料</div>
              <div style={{ fontSize: 42, fontWeight: 900, color: G.main, lineHeight: 1 }}>0<span style={{ fontSize: 22 }}>円</span></div>
            </div>
          </div>

          {/* 実績バッジ */}
          <div style={{
            display: "flex", gap: 10, marginBottom: 28, flexWrap: "wrap",
          }}>
            {[
              { label: "SNSフォロワー", val: "5万人+", sub: "※各SNS合計" },
              { label: "Google口コミ", val: "4.9", sub: "★★★★★" },
              { label: "月間お問合せ", val: "300組+", sub: "" },
            ].map(b => (
              <div key={b.label} style={{
                flex: 1, minWidth: 90,
                background: "white", borderRadius: 12, padding: "10px 8px",
                textAlign: "center", boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                border: `1px solid ${G.light}`,
              }}>
                <div style={{ fontSize: 10, color: "#6b7280", marginBottom: 2 }}>{b.label}</div>
                <div style={{ fontSize: 20, fontWeight: 900, color: G.main, lineHeight: 1 }}>{b.val}</div>
                {b.sub && <div style={{ fontSize: 10, color: "#f59e0b" }}>{b.sub}</div>}
              </div>
            ))}
          </div>

          {/* CTA */}
          <div style={{ background: G.bg, borderRadius: 16, padding: "16px", textAlign: "center" }}>
            <div style={{ fontSize: 18, fontWeight: 900, color: G.dark, letterSpacing: 2, marginBottom: 4 }}>
              24H SUPPORT
            </div>
            <div style={{ fontSize: 11, color: "#6b7280", marginBottom: 12 }}>初めての方も安心してご相談を</div>
            <LineBtn />
          </div>
        </div>
      </section>

      {/* ── Section 2: Google口コミ ─────────────────── */}
      <Section id="reviews" bg="white">
        <div style={{ textAlign: "center", marginBottom: 24 }}>
          <div style={{ fontSize: 16, color: "#4b5563", marginBottom: 8 }}>多くのお客様から</div>
          <div style={{ fontSize: 26, fontWeight: 900, color: "#1a1a1a", marginBottom: 4 }}>
            <span style={{ color: G.main }}>ご満足のお声</span>を
          </div>
          <div style={{ fontSize: 18, fontWeight: 700, color: "#1a1a1a" }}>いただいております。</div>
        </div>

        {/* Google評価 */}
        <div style={{
          background: G.bg, borderRadius: 16, padding: "20px",
          textAlign: "center", marginBottom: 20,
          border: `1px solid ${G.light}`,
        }}>
          <div style={{ fontSize: 11, color: "#6b7280", marginBottom: 4 }}>Google口コミ</div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12 }}>
            <div style={{ fontSize: 56, fontWeight: 900, color: G.main, lineHeight: 1 }}>4.9</div>
            <div>
              <div style={{ fontSize: 24, color: "#f59e0b", letterSpacing: 2 }}>★★★★★</div>
              <div style={{ fontSize: 11, color: "#6b7280" }}>382 レビュー・オ Google</div>
            </div>
            <Mascot size={52} />
          </div>
          <a href="#" style={{
            display: "block", marginTop: 16,
            background: `linear-gradient(135deg, ${G.main}, ${G.dark})`,
            color: "white", borderRadius: 50,
            padding: "12px 0", fontSize: 14, fontWeight: 700,
            textDecoration: "none",
          }}>Googleでレビューを見る &gt;</a>
        </div>

        {/* 口コミカード */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          {[
            { name: "椿奈陽奈", text: "スタッフの方々にとても親切に対応していただきました…", date: "1日前" },
            { name: "Nta", text: "遅くまでやっていて仕事終わりに行けて良い。接客が丁…", date: "1日前" },
            { name: "hn", text: "初期費用がからなくてよかったです！おすすめでーす！", date: "1日前" },
            { name: "dawn mk", text: "初めての同棲で家のこととかなにもわからなかったんで…", date: "1日前" },
          ].map((r, i) => (
            <div key={i} style={{
              background: "white", borderRadius: 12, padding: "12px",
              border: "1px solid #e5e7eb", boxShadow: "0 1px 6px rgba(0,0,0,0.05)",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 6 }}>
                <div style={{
                  width: 28, height: 28, borderRadius: "50%",
                  background: `linear-gradient(135deg, ${G.main}, ${G.dark})`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: "white", fontSize: 11, fontWeight: 700, flexShrink: 0,
                }}>{r.name[0]}</div>
                <div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: "#1a1a1a" }}>{r.name}</div>
                  <div style={{ fontSize: 9, color: "#9ca3af" }}>{r.date}</div>
                </div>
              </div>
              <div style={{ fontSize: 10, color: "#f59e0b", marginBottom: 4 }}>★★★★★</div>
              <div style={{ fontSize: 11, color: "#4b5563", lineHeight: 1.5 }}>{r.text}</div>
              <div style={{ fontSize: 10, color: G.main, marginTop: 4, fontWeight: 600 }}>続きを読む</div>
            </div>
          ))}
        </div>
      </Section>

      {/* ── Section 3: 仲介手数料0円 ───────────────── */}
      <Section id="fee" bg={G.bg}>
        <div style={{ textAlign: "center", marginBottom: 24 }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: "#1a1a1a", marginBottom: 4 }}>ノースハウスは</div>
          <div style={{ fontSize: 20, fontWeight: 800, color: "#1a1a1a", marginBottom: 4 }}>全物件 仲介手数料</div>
          <div style={{
            fontSize: 80, fontWeight: 900, color: G.main, lineHeight: 1,
            display: "flex", alignItems: "flex-end", justifyContent: "center", gap: 4,
          }}>
            0<span style={{ fontSize: 32, marginBottom: 10 }}>円</span>
            <Mascot size={64} style={{ marginBottom: 4 }} />
          </div>
        </div>

        {/* 吹き出し説明 */}
        <div style={{
          background: "white", borderRadius: 14, padding: "14px 18px",
          border: `2px solid ${G.main}`, marginBottom: 24,
          position: "relative",
        }}>
          <div style={{
            position: "absolute", top: -12, left: 20,
            background: "white", padding: "0 8px",
            fontSize: 12, fontWeight: 700, color: G.main,
            border: `2px solid ${G.main}`, borderRadius: 20,
          }}>仲介手数料ってなに？</div>
          <p style={{ fontSize: 13, color: "#4b5563", lineHeight: 1.7, margin: "6px 0 0" }}>
            お部屋を契約するときに<br />
            不動産会社へ支払う<br />
            手数料のことだよ。
          </p>
        </div>

        {/* 比較表 */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 20 }}>
          {/* NORTH HOUSE */}
          <div style={{
            background: "white", borderRadius: 14, padding: "16px 12px",
            border: `2px solid ${G.main}`,
          }}>
            <div style={{
              background: G.main, color: "white", borderRadius: 8,
              padding: "6px 0", textAlign: "center", fontSize: 11,
              fontWeight: 800, marginBottom: 14, letterSpacing: 1,
            }}>NORTH HOUSE</div>
            <div style={{ textAlign: "center", marginBottom: 8 }}>
              <div style={{ fontSize: 10, color: "#6b7280" }}>お客様</div>
              <div style={{ fontSize: 20 }}>👨‍👩‍👦</div>
            </div>
            <div style={{
              background: "#fee2e2", color: "#dc2626", borderRadius: 6,
              padding: "6px 0", textAlign: "center", fontSize: 11, fontWeight: 700,
              marginBottom: 6,
            }}>✕ 仲介手数料<br />お支払いなし</div>
            <div style={{ textAlign: "center", marginBottom: 4 }}>
              <div style={{ fontSize: 10, color: "#6b7280" }}>大家さん</div>
              <div style={{ fontSize: 20 }}>🏠</div>
              <div style={{ fontSize: 10, color: G.main, fontWeight: 600 }}>仲介手数料</div>
            </div>
            <div style={{
              background: G.light, borderRadius: 8, padding: "6px 0",
              textAlign: "center", fontSize: 10, color: G.dark, fontWeight: 700, marginTop: 8,
            }}>
              大家さんからのみ<br />受け取り
            </div>
          </div>

          {/* 一般的な不動産会社 */}
          <div style={{
            background: "white", borderRadius: 14, padding: "16px 12px",
            border: "2px solid #d1d5db",
          }}>
            <div style={{
              background: "#9ca3af", color: "white", borderRadius: 8,
              padding: "6px 0", textAlign: "center", fontSize: 10,
              fontWeight: 800, marginBottom: 14,
            }}>一般的な不動産会社</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 4, marginBottom: 8 }}>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: 10, color: "#6b7280" }}>お客様</div>
                <div style={{ fontSize: 16 }}>👨‍👩‍👦</div>
                <div style={{ fontSize: 9, color: "#dc2626", fontWeight: 600 }}>仲介手数料</div>
                <div style={{ fontSize: 14 }}>💰</div>
              </div>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: 10, color: "#6b7280" }}>大家さん</div>
                <div style={{ fontSize: 16 }}>🏠</div>
                <div style={{ fontSize: 9, color: "#dc2626", fontWeight: 600 }}>仲介手数料</div>
                <div style={{ fontSize: 14 }}>💰</div>
              </div>
            </div>
            <div style={{ textAlign: "center", marginTop: 8 }}>
              <div style={{ fontSize: 16 }}>🏢</div>
              <div style={{ fontSize: 9, color: "#6b7280", fontWeight: 600 }}>大家さんとお客様の<br />両方から受け取り</div>
            </div>
          </div>
        </div>

        <div style={{
          background: "white", borderRadius: 12, padding: "14px 16px",
          border: `1px solid ${G.light}`,
          fontSize: 13, color: "#4b5563", lineHeight: 1.7, textAlign: "center",
        }}>
          一般的な不動産会社は入居者様と大家さんの両方から<br />
          仲介手数料を受け取りますが NORTH HOUSEでは<br />
          大家さんからのみいただくため<br />
          <strong style={{ fontSize: 16, color: G.dark }}>入居者様の負担はありません。</strong>
        </div>
      </Section>

      {/* ── Section 4: さらに POINT 01-03 ─────────── */}
      <Section id="points" bg="white">
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12 }}>
            <div style={{ fontSize: 28, fontWeight: 900, color: "#1a1a1a" }}>さらに！</div>
            <Mascot size={52} />
          </div>
        </div>

        <PointCard num={1} title="<span style='color:#22c55e'>初期費用</span>を抑えて<br/>お得に新生活スタート！" icon="💰">
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 10, color: "#6b7280", marginBottom: 6 }}>他社様</div>
              {[
                { color: "#f97316", label: "数万円", sub: "家具代金・家賃1ヶ月分" },
                { color: "#ef4444", label: "8万円", sub: "仲介手数料" },
                { color: "#9ca3af", label: "8万円", sub: "家賃" },
              ].map((r, i) => (
                <div key={i} style={{
                  background: r.color, color: "white",
                  borderRadius: 4, padding: "4px 8px", marginBottom: 3,
                  fontSize: 12, fontWeight: 700,
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                }}>
                  <span>{r.label}</span>
                  <span style={{ fontSize: 9, opacity: 0.9 }}>{r.sub}</span>
                </div>
              ))}
            </div>
            <div style={{ fontSize: 20 }}>→</div>
            <div style={{
              flex: 1, background: G.light,
              borderRadius: 12, padding: "12px 10px",
              border: `2px solid ${G.main}`, textAlign: "center",
            }}>
              <div style={{ fontSize: 10, color: G.dark, fontWeight: 600 }}>NORTH HOUSEなら</div>
              <div style={{ fontSize: 22, fontWeight: 900, color: G.main, lineHeight: 1.2 }}>10万円以上</div>
              <div style={{ fontSize: 11, color: G.dark, fontWeight: 600 }}>お得になるチャンス！</div>
              <div style={{ fontSize: 9, color: "#9ca3af", marginTop: 4 }}>※家賃8万円の場合</div>
            </div>
          </div>
        </PointCard>

        <PointCard num={2} title="<span style='color:#22c55e'>24時間対応</span>で<br/>すぐに相談・解決！" icon="📱">
          <div style={{
            background: G.bg, borderRadius: 10, padding: "12px",
            textAlign: "center", fontSize: 13, color: G.dark, fontWeight: 600,
          }}>
            お客様のペースで相談OK！
          </div>
        </PointCard>

        <PointCard num={3} title="仕事終わりでもOK！<br/><span style='color:#22c55e'>夜の内覧対応</span>" icon="🌙">
          <div style={{
            background: G.bg, borderRadius: 10, padding: "12px",
            fontSize: 13, color: "#4b5563",
          }}>
            事前予約でスムーズにご案内！
          </div>
        </PointCard>

        {/* NORTH HOUSEが選ばれる理由 */}
        <div style={{ textAlign: "center", margin: "32px 0 24px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
            <div style={{ height: 1, flex: 1, background: `${G.main}40` }} />
            <div style={{ fontSize: 14, fontWeight: 800, color: "#1a1a1a", whiteSpace: "nowrap" }}>
              NORTH HOUSEが<span style={{ color: G.main }}>選ばれる理由</span>
            </div>
            <div style={{ height: 1, flex: 1, background: `${G.main}40` }} />
          </div>
        </div>

        <PointCard num={4} title="市内全物件OK！<br/>理想のお部屋が見つかる" icon="🏙️">
          <div style={{
            background: G.bg, borderRadius: 10, padding: "10px 12px",
            fontSize: 13, color: G.dark, fontWeight: 600,
          }}>
            <span style={{ color: G.main }}>新着 &amp; 非公開物件</span>もご紹介！
          </div>
        </PointCard>

        <PointCard num={5} title="どこにいても安心！<br/><span style='color:#22c55e'>オンラインで内見&amp;契約OK</span>" icon="💻">
          <div style={{
            background: G.bg, borderRadius: 10, padding: "10px 12px",
            fontSize: 12, color: "#4b5563", lineHeight: 1.6,
          }}>
            ZOOMやLINEビデオを使い、<br />
            <span style={{ color: G.main, fontWeight: 700 }}>オンライン内見&amp;契約が可能！</span>
          </div>
        </PointCard>

        <PointCard num={6} title="他社見積りOK！<br/><span style='color:#22c55e'>減額率99%</span>" icon="📊">
          <div style={{ display: "flex", alignItems: "flex-end", gap: 16 }}>
            <div style={{ fontSize: 12, color: "#4b5563", lineHeight: 1.6, flex: 1 }}>
              他社の見積りと比較可能で、<span style={{ color: G.main, fontWeight: 700 }}>99%減額を実現！</span>
            </div>
            <div style={{ display: "flex", alignItems: "flex-end", gap: 6 }}>
              <div style={{ textAlign: "center" }}>
                <div style={{ width: 40, height: 70, background: G.main, borderRadius: "4px 4px 0 0" }} />
                <div style={{ fontSize: 9, color: G.dark, fontWeight: 700, marginTop: 2 }}>NORTH<br />HOUSE</div>
              </div>
              <div style={{ textAlign: "center" }}>
                <div style={{ width: 40, height: 90, background: "#d1d5db", borderRadius: "4px 4px 0 0" }} />
                <div style={{ fontSize: 9, color: "#6b7280", marginTop: 2 }}>他社様</div>
              </div>
            </div>
          </div>
        </PointCard>
      </Section>

      {/* ── CTA バナー ──────────────────────────────── */}
      <div style={{ padding: "24px 20px", background: G.bg, textAlign: "center" }}>
        <div style={{ fontSize: 20, fontWeight: 900, color: G.dark, letterSpacing: 2, marginBottom: 4 }}>
          24H SUPPORT
        </div>
        <div style={{ fontSize: 12, color: "#6b7280", marginBottom: 14 }}>初めての方も安心してご相談を</div>
        <LineBtn />
      </div>

      {/* ── Section 5: 店舗案内 ─────────────────────── */}
      <Section id="office" bg="white">
        <SectionTitle en="OFFICE" ja="店舗のご案内" />

        {/* 店舗外観・内観イメージ（プレースホルダー） */}
        <div style={{
          borderRadius: 16, overflow: "hidden", marginBottom: 16,
          background: `linear-gradient(135deg, ${G.bg}, ${G.light})`,
          height: 160, display: "flex", alignItems: "center", justifyContent: "center",
          border: `1px solid ${G.light}`,
        }}>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 48 }}>🏢</div>
            <div style={{ fontSize: 13, color: G.dark, fontWeight: 700 }}>NORTH HOUSE 菊水店</div>
          </div>
        </div>

        {/* 地図エリア */}
        <div style={{
          background: G.bg, borderRadius: 14, padding: "16px",
          border: `1px solid ${G.light}`, marginBottom: 20, textAlign: "center",
        }}>
          <div style={{ fontSize: 13, color: "#4b5563", marginBottom: 6 }}>
            📍 〒003-0803 札幌市白石区菊水3条2丁目5番3号
          </div>
          <div style={{ fontSize: 12, color: "#9ca3af", marginBottom: 10 }}>リレイト菊水駅前</div>
          <a
            href="https://maps.google.com"
            style={{
              display: "inline-block", background: "white",
              border: `1px solid ${G.main}`, color: G.main,
              borderRadius: 20, padding: "6px 16px",
              fontSize: 12, fontWeight: 700, textDecoration: "none",
            }}
          >Google Mapで見る</a>
        </div>

        {/* Renewal Open バナー */}
        <div style={{
          background: `linear-gradient(135deg, ${G.main}, ${G.dark})`,
          borderRadius: 16, padding: "20px",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          marginBottom: 24,
        }}>
          <div>
            <div style={{ fontSize: 26, fontWeight: 900, color: "white", lineHeight: 1.1 }}>
              2025/11<br />
              <span style={{ fontSize: 20 }}>Renewal Open</span>
            </div>
            <div style={{
              fontSize: 13, color: "white", marginTop: 8,
              display: "flex", alignItems: "center", gap: 6,
            }}>
              <span>🚃</span> 菊水駅から<strong>徒歩すぐ</strong>
            </div>
          </div>
          <Mascot size={60} />
        </div>

        <div style={{ background: G.bg, borderRadius: 16, padding: "16px", textAlign: "center" }}>
          <div style={{ fontSize: 18, fontWeight: 900, color: G.dark, letterSpacing: 2, marginBottom: 4 }}>
            24H SUPPORT
          </div>
          <div style={{ fontSize: 11, color: "#6b7280", marginBottom: 12 }}>初めての方も安心してご相談を</div>
          <LineBtn />
        </div>
      </Section>

      {/* ── Section 6: ご利用の流れ ─────────────────── */}
      <Section id="flow" bg={G.bg}>
        <SectionTitle en="FLOW" ja="ご相談からご案内までの流れ" />

        <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
          <StepCard num={1} label="条件を元にお部屋探し＆内覧" icon="🔍" />
          <StepCard num={2} label="お申し込み" icon="📝" />
          <StepCard num={3} label="審査" icon="📋" />
          <StepCard num={4} label="ご契約" icon="🤝" />
          <StepCard num={5} label="鍵のお渡し" icon="🔑" last />
        </div>

        <div style={{ textAlign: "center", marginTop: 28 }}>
          <div style={{ fontSize: 12, color: "#6b7280", marginBottom: 12 }}>
            初めての方も安心してご相談を
          </div>
          <LineBtn />
        </div>
      </Section>

      {/* ── Section 7: FAQ ──────────────────────────── */}
      <Section id="faq" bg="white">
        <SectionTitle en="FAQ" ja="よくあるご質問" />

        {[
          {
            q: "連帯保証人は必要ですか？",
            a: "保証会社を利用する物件がほとんどですので、連帯保証人が不要なケースが多いです。詳しくはお気軽にご相談ください。",
          },
          {
            q: "お部屋探しは店舗とオンラインどっちがいいですか？",
            a: "どちらも対応可能です！お客様のご都合に合わせて選んでいただけます。ZOOMやLINEビデオでのオンライン相談も好評です。",
          },
          {
            q: "なぜ安くなるんですか？",
            a: "NORTH HOUSEは大家さんからのみ仲介手数料をいただくため、お客様の仲介手数料が0円になります。",
          },
          {
            q: "他社で見ている物件は紹介できますか？",
            a: "はい、可能です。市内全物件に対応しておりますので、他社様で見ている物件もご紹介できます。",
          },
          {
            q: "初期費用の分割払いは可能ですか？",
            a: "物件によって異なりますが、分割払いに対応している場合もございます。まずはご相談ください。",
          },
          {
            q: "未成年でもお部屋を借りられますか？",
            a: "未成年の方でもお部屋を借りることは可能ですが、通常は親権者の同意が必要となります。",
          },
          {
            q: "札幌以外のエリアも紹介できますか？",
            a: "基本的には札幌市内を中心にご対応しておりますが、詳しくはお気軽にご相談ください。",
          },
          {
            q: "審査が通るか不安です。",
            a: "審査に不安がある方もお気軽にご相談ください。多数の物件をご紹介できますので、お客様に合った物件をご提案します。",
          },
        ].map((item, i) => (
          <FaqItem key={i} q={item.q} a={item.a} />
        ))}

        <div style={{
          display: "flex", alignItems: "center", gap: 12,
          background: G.bg, borderRadius: 14, padding: "14px 16px",
          marginTop: 16, border: `1px solid ${G.light}`,
        }}>
          <Mascot size={44} />
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#1a1a1a" }}>わからないことは</div>
            <div style={{ fontSize: 13, fontWeight: 700, color: G.main }}>LINEでお問合せください！</div>
          </div>
        </div>

        <div style={{ marginTop: 20 }}>
          <LineBtn />
        </div>
      </Section>

      {/* ── Section 8: CTAと会社概要 ────────────────── */}
      <Section id="contact" bg={G.bg} style={{ paddingBottom: 0 }}>
        {/* 最終CTA */}
        <div style={{
          background: `linear-gradient(160deg, white 40%, ${G.bg} 100%)`,
          borderRadius: 20, padding: "28px 20px",
          textAlign: "center", marginBottom: 32,
          boxShadow: "0 4px 20px rgba(34,197,94,0.15)",
          border: `1px solid ${G.light}`,
        }}>
          <div style={{ fontSize: 11, color: "#6b7280", marginBottom: 4 }}>初めての方も安心してご相談を</div>
          <div style={{ fontSize: 28, fontWeight: 900, color: G.dark, letterSpacing: 2, marginBottom: 12 }}>
            24H SUPPORT
          </div>
          <div style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 26, fontWeight: 900 }}>
              <span style={{ color: G.main }}>札幌</span>で
            </div>
            <div style={{
              fontSize: 28, fontWeight: 900,
              background: `linear-gradient(90deg, ${G.main}, ${G.dark})`,
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            }}>"損しない"</div>
            <div style={{ fontSize: 24, fontWeight: 800, color: "#1a1a1a" }}>お部屋探しを。</div>
          </div>
          <Mascot size={64} style={{ marginBottom: 16 }} />
          <LineBtn large />
        </div>

        {/* 会社概要 */}
        <div style={{
          background: "white", borderRadius: 20, padding: "24px 20px",
          border: `1px solid ${G.light}`,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20 }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 15, fontWeight: 800, color: "#1a1a1a" }}>会社概要</div>
            </div>
            <div style={{ fontSize: 22, fontWeight: 900, color: G.light, letterSpacing: 1 }}>COMPANY</div>
            <Mascot size={36} />
          </div>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <tbody>
              {[
                ["会社名", "株式会社YKアシスト"],
                ["屋号名", "NORTH HOUSE"],
                ["所在地", "〒003-0803 札幌市白石区菊水3条2丁目5番3号\nリレイト菊水駅前"],
                ["TEL", "011-376-5956"],
                ["FAX", "011-376-5957"],
                ["Mail", "info@northhouse.co.jp"],
                ["免許番号", "国土交通大臣（１）第11025号"],
                ["所属団体", "公益社団法人全国宅地建物取引業保証協会"],
              ].map(([k, v]) => (
                <tr key={k} style={{ borderBottom: `1px solid ${G.light}` }}>
                  <td style={{
                    padding: "10px 8px", fontSize: 12,
                    color: G.main, fontWeight: 700, whiteSpace: "nowrap",
                    verticalAlign: "top", width: "30%",
                  }}>{k}</td>
                  <td style={{
                    padding: "10px 8px", fontSize: 12,
                    color: "#374151", lineHeight: 1.5,
                    whiteSpace: "pre-line",
                  }}>{v}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* フッター */}
        <div style={{
          textAlign: "center", padding: "20px 0",
          fontSize: 11, color: "#9ca3af",
        }}>
          © NORTH HOUSE REAL ESTATE
        </div>
      </Section>

      {/* ── 固定CTAボタン ────────────────────────────── */}
      <div style={{
        position: "fixed", bottom: 20, left: "50%", transform: "translateX(-50%)",
        zIndex: 100, width: "calc(100% - 40px)", maxWidth: 440,
      }}>
        <LineBtn label="LINE で今すぐ無料相談 →" style={{ boxShadow: "0 8px 24px rgba(6,199,85,0.5)" }} />
      </div>
      {/* 固定ボタン分のスペース */}
      <div style={{ height: 72 }} />
    </div>
  );
}
