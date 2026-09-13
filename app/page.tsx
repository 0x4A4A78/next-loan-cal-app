"use client";
import { useMemo, useState } from "react";
const fmt = (n: number) =>
  new Intl.NumberFormat("th-TH", { maximumFractionDigits: 0 }).format(n);
<svg className="brand-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><rect x="3" y="6" width="18" height="13" rx="2"/><path d="M3 10h18M7 15h3"/></svg>

export default function Home() {
  const [principal, setPrincipal] = useState("500000");
  const [rate, setRate] = useState("6.5");
  const [months, setMonths] = useState("60");
  const p = Number(principal) || 0,
    r = (Number(rate) || 0) / 100 / 12,
    n = Number(months) || 0;
  const payment = useMemo(
    () => (r ? (p * r * (1 + r) ** n) / ((1 + r) ** n - 1) : n ? p / n : 0),
    [p, r, n],
  );
  const total = payment * n;
  const interest = Math.max(0, total - p);
  const rows = Array.from({ length: Math.min(n || 0, 12) }, (_, i) => {
    let balance = p;
    for (let j = 0; j < i; j++) balance -= payment - balance * r;
    const interestPart = balance * r;
    return {
      month: i + 1,
      interest: interestPart,
      principal: payment - interestPart,
      balance: Math.max(0, balance - payment + interestPart),
    };
  });
  return (
    <main className="shell">
      <div className="wrap">
        <nav className="topbar">
          <div className="brand">
            <svg className="brand-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><rect x="3" y="6" width="18" height="13" rx="2"/><path d="M3 10h18M7 15h3"/></svg>
            <span>LENDLY</span>
          </div>
          <span className="toplink">วางแผนภาระผ่อนให้พอดี</span>
        </nav>
        <section className="hero">
          <div className="eyebrow">Loan planner / 03</div>
          <h1>
            รู้ค่างวด
            <br />
            ก่อนตัดสินใจ
          </h1>
          <p>
            จำลองค่างวดรายเดือนและดูสัดส่วนเงินต้นกับดอกเบี้ยตลอดสัญญาได้อย่างโปร่งใส
          </p>
        </section>
        <div className="grid">
          <section className="card">
            <h2>รายละเอียดสินเชื่อ</h2>
            <div className="form-grid">
              <label className="field full">
                <span className="label">
                  ยอดเงินกู้ <small>(บาท)</small>
                </span>
                <input
                  className="input"
                  type="number"
                  min="0"
                  value={principal}
                  onChange={(e) => setPrincipal(e.target.value)}
                />
              </label>
              <label className="field">
                <span className="label">
                  ดอกเบี้ยต่อปี <small>(%)</small>
                </span>
                <input
                  className="input"
                  type="number"
                  min="0"
                  step=".1"
                  value={rate}
                  onChange={(e) => setRate(e.target.value)}
                />
              </label>
              <label className="field">
                <span className="label">
                  ระยะเวลาผ่อน <small>(เดือน)</small>
                </span>
                <input
                  className="input"
                  type="number"
                  min="1"
                  value={months}
                  onChange={(e) => setMonths(e.target.value)}
                />
              </label>
            </div>
            <div className="metric-row" style={{ marginTop: 20 }}>
              <span>อัตราดอกเบี้ยต่อเดือน</span>
              <strong>{(r * 100).toFixed(3)}%</strong>
            </div>
            <p className="note">ค่างวดคงที่ตลอดสัญญาตามสูตร Annuity</p>
          </section>
          <section className="card result">
            <div className="result-main">
              <div className="result-label">ค่างวดรายเดือน</div>
              <div className="big-number">฿{fmt(payment)}</div>
              <span className="badge">
                {n} งวด · {rate}% ต่อปี
              </span>
            </div>
            <div>
              <div className="metric-row">
                <span>ดอกเบี้ยรวมตลอดสัญญา</span>
                <strong>฿{fmt(interest)}</strong>
              </div>
              <div className="metric-row">
                <span>ยอดชำระรวม</span>
                <strong>฿{fmt(total)}</strong>
              </div>
            </div>
          </section>
        </div>
        <section className="card" style={{ marginTop: 18 }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 12,
            }}
          >
            <h2 style={{ margin: 0 }}>ตารางผ่อนชำระ</h2>
            <span className="badge">แสดง 12 งวดแรก</span>
          </div>
          <div className="table-wrap">
            <table className="table">
              <thead>
                <tr>
                  <th>งวด</th>
                  <th>เงินต้น</th>
                  <th>ดอกเบี้ย</th>
                  <th>คงเหลือ</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((x) => (
                  <tr key={x.month}>
                    <td>{x.month}</td>
                    <td>฿{fmt(x.principal)}</td>
                    <td>฿{fmt(x.interest)}</td>
                    <td>฿{fmt(x.balance)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
        <div className="footer">
          ประมาณการจากอัตราดอกเบี้ยคงที่ ไม่รวมค่าธรรมเนียมจากสถาบันการเงิน
        </div>
      </div>
    </main>
  );
}
