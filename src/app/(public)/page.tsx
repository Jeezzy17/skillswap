// import Link from "next/link";
// import { Suspense } from "react";
// import { MemberCard } from "@/components/members/member-card";
// import { ResponseChart } from "@/components/members/response-chart";
// import { buttonStyles } from "@/components/ui/button";
// import { Card, Skeleton } from "@/components/ui/primitives";
// import { members, responseTrend } from "@/lib/data";
// async function Trend() { await new Promise((r) => setTimeout(r, 500)); return <Card><ResponseChart data={responseTrend} /></Card>; }
// export default function Eksplorasi() {
//   const stats = [["326", "Ahli aktif"], ["18", "Topik"], ["4.8", "Rating"]] as const;
//   return (
//     <div className="space-y-6">
//       <section className="rounded-2xl bg-brand p-6 text-background">
//         <h1 className="text-2xl font-bold">Komunitas Tukar Keahlian</h1>
//         <p className="mb-4 mt-1">Belajar bersama, tumbuh bersama — aman dan setara.</p>
//         <Link href="/cari" className={buttonStyles("outline", "md", "border-background text-background hover:bg-background/20")}>Cari mentor / partner</Link>
//       </section>
//       <section aria-label="Statistik" className="grid grid-cols-3 gap-3">
//         {stats.map(([v, l]) => <Card key={l}><b className="text-2xl text-brand">{v}</b><span className="text-sm text-subtle">{l}</span></Card>)}
//       </section>
//       <Suspense fallback={<Skeleton n={1} />}><Trend /></Suspense>
//       <section><h2 className="mb-3 text-lg font-semibold">Anggota populer</h2>
//         <div className="grid gap-3 md:grid-cols-2">{members.slice(0, 4).map((m) => <MemberCard key={m.id} m={m} />)}</div></section>
//     </div>
//   );
// }

import Link from "next/link";
import { cookies } from "next/headers";
import { Suspense } from "react";
import { ResponseChart } from "@/components/members/response-chart";
import { buttonStyles } from "@/components/ui/button";
import { Avatar, Card, Chip, EmptyState, Skeleton, StatusBadge } from "@/components/ui/primitives";
import { members, responseTrend, sessions } from "@/lib/data";
import { CATEGORIES } from "@/types/member";

const STEPS = [
  ["Lengkapi profil", "Tulis keahlian yang bisa kamu ajarkan dan yang ingin kamu pelajari."],
  ["Cari keahlian", "Temukan mentor atau partner lewat kata kunci dan kategori."],
  ["Buka profil", "Lihat rating, jumlah sesi, dan keahlian anggota."],
  ["Ajukan pertukaran", "Kirim permintaan sesi beserta pesan singkat."],
  ["Sepakati jadwal", "Atur waktu sesi lewat chat dan menu Jadwal."],
  ["Beri ulasan", "Setelah sesi, beri rating agar komunitas tetap tepercaya."],
] as const;

const TIPS = [
  "Pertukaran bersifat setara dan tanpa pembayaran.",
  "Sepakati jadwal lewat chat SkillSwap.",
  "Jangan bagikan password atau data pribadi sensitif.",
  "Beri ulasan yang jujur setelah sesi selesai.",
];

const ACTIVITY = [
  { text: "Alya Putri menerima permintaan sesimu", time: "2 jam lalu" },
  { text: "Pesan baru dari Raka Pratama", time: "5 jam lalu" },
  { text: "Sesi dengan Bima Saputra selesai", time: "Kemarin" },
];

async function Trend() {
  await new Promise((r) => setTimeout(r, 500)); // simulasi latensi API
  return <Card><ResponseChart data={responseTrend} /></Card>;
}

function Stat({ label, value, hint }: { label: string; value: string; hint: string }) {
  return (
    <Card>
      <span className="text-sm text-subtle">{label}</span>
      <b className="text-3xl text-brand">{value}</b>
      <span className="text-xs text-subtle">{hint}</span>
    </Card>
  );
}

export default async function Eksplorasi() {
  const name = (await cookies()).get("ss_session")?.value ?? "teman";
  const lastRate = responseTrend[responseTrend.length - 1]?.rate ?? 0;
  const upcoming = sessions.filter((s) => s.status !== "selesai");
  const top = [...members].sort((a, b) => b.rating - a.rating || b.sessions - a.sessions).slice(0, 5);
  const wanted = Array.from(new Set(members.map((m) => m.wants)));
  const totalSessions = members.reduce((n, m) => n + m.sessions, 0);
  const profileDone = 60;

  return (
    <div className="space-y-8">
      <header className="rounded-2xl bg-brand p-6 text-background">
        <p className="text-sm opacity-90">Komunitas Tukar Keahlian</p>
        <h1 className="text-2xl font-bold capitalize md:text-3xl">Halo, {name}!</h1>
        <p className="mb-4 mt-1 max-w-xl">Tukar keahlian dengan anggota lain secara aman dan setara. Kamu mengajar satu hal, belajar hal lain.</p>
        <div className="flex flex-wrap gap-2">
          <Link href="/cari" className={buttonStyles("outline", "md", "border-background bg-background text-brand hover:bg-background/90")}>Cari mentor / partner</Link>
          <Link href="/permintaan" className={buttonStyles("outline", "md", "border-background text-background hover:bg-background/20")}>Ajukan pertukaran</Link>
        </div>
      </header>

      <section aria-label="Statistik" className="grid grid-cols-2 gap-3 xl:grid-cols-4">
        <Stat label="Ahli aktif" value="326" hint="anggota komunitas" />
        <Stat label="Sesi terlaksana" value={String(totalSessions)} hint="dari anggota unggulan" />
        <Stat label="Rating rata-rata" value="4.8" hint="dari seluruh sesi" />
        <Stat label="Respons ≤ 24 jam" value={`${lastRate}%`} hint="target 60%" />
      </section>

      <section aria-labelledby="cara">
        <h2 id="cara" className="mb-3 text-lg font-semibold">Cara kerja SkillSwap</h2>
        <ol className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {STEPS.map(([title, desc], i) => (
            <li key={title}><Card className="h-full">
              <span className="grid size-8 place-items-center rounded-full bg-brand text-sm font-bold text-background" aria-hidden>{i + 1}</span>
              <h3 className="font-semibold">{title}</h3>
              <p className="text-sm text-subtle">{desc}</p>
            </Card></li>
          ))}
        </ol>
      </section>

      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <div className="min-w-0 space-y-8">
          <Suspense fallback={<Skeleton n={1} />}><Trend /></Suspense>

          <section aria-labelledby="top">
            <div className="mb-3 flex items-center justify-between">
              <h2 id="top" className="text-lg font-semibold">Anggota dengan rating tertinggi</h2>
              <Link href="/cari" className="text-sm font-medium text-brand underline">Lihat semua</Link>
            </div>
            <Card>
              <ol className="divide-y divide-border">
                {top.map((m, i) => (
                  <li key={m.id}>
                    <Link href={`/anggota/${m.id}`} className="flex min-h-14 items-center gap-3 py-2 hover:bg-muted focus-visible:outline-2 focus-visible:outline-brand">
                      <span className="w-5 text-center font-bold text-subtle">{i + 1}</span>
                      <Avatar name={m.name} />
                      <span className="min-w-0 flex-1"><span className="block truncate font-semibold">{m.name}</span>
                        <span className="block truncate text-sm text-subtle">{m.role} · {m.skills.join(", ")}</span></span>
                      <span className="text-right text-sm"><b>★ {m.rating}</b><span className="block text-xs text-subtle">{m.sessions} sesi</span></span>
                    </Link>
                  </li>
                ))}
              </ol>
            </Card>
          </section>

          <section aria-labelledby="kat">
            <h2 id="kat" className="mb-3 text-lg font-semibold">Jelajahi kategori</h2>
            <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
              {CATEGORIES.map((c) => {
                const inCat = members.filter((m) => m.category === c);
                const skills = Array.from(new Set(inCat.flatMap((m) => m.skills))).slice(0, 3).join(", ");
                return (
                  <Link key={c} href={`/cari?category=${c}`} className="rounded-xl border border-border bg-surface p-3 hover:bg-muted focus-visible:outline-2 focus-visible:outline-brand">
                    <span className="block font-semibold capitalize">{c}</span>
                    <span className="block text-xs text-subtle">{inCat.length} anggota</span>
                    <span className="mt-1 block text-sm">{skills || "Segera hadir"}</span>
                  </Link>
                );
              })}
            </div>
          </section>

          <section aria-labelledby="dicari">
            <h2 id="dicari" className="mb-1 text-lg font-semibold">Keahlian yang sedang dicari</h2>
            <p className="mb-3 text-sm text-subtle">Punya keahlian ini? Ajukan pertukaran dan bantu mereka belajar.</p>
            <div className="flex flex-wrap gap-2">{wanted.map((w) => <Chip key={w}>{w}</Chip>)}</div>
          </section>
        </div>

        <aside className="space-y-6">
          <section aria-labelledby="sesi">
            <h2 id="sesi" className="mb-3 text-lg font-semibold">Sesi mendatang</h2>
            {upcoming.length === 0 ? (
              <EmptyState title="Belum ada sesi" text="Ajukan pertukaran untuk mulai belajar." href="/cari" cta="Cari anggota" />
            ) : (
              <div className="space-y-3">
                {upcoming.map((s) => {
                  const m = members.find((x) => x.id === s.withId);
                  return (
                    <Card key={s.id}>
                      <div className="flex items-center gap-3"><Avatar name={m?.name ?? "?"} />
                        <div className="min-w-0 flex-1"><p className="truncate font-semibold">{m?.name}</p><p className="text-sm text-subtle">{s.when}</p></div></div>
                      <p className="text-sm">{s.topic}</p>
                      <div><StatusBadge status={s.status} /></div>
                    </Card>
                  );
                })}
                <Link href="/jadwal" className={buttonStyles("outline", "md", "w-full")}>Buka jadwal</Link>
              </div>
            )}
          </section>

          <Card>
            <h2 className="font-semibold">Lengkapi profil keahlianmu</h2>
            <div role="progressbar" aria-valuenow={profileDone} aria-valuemin={0} aria-valuemax={100} aria-label="Kelengkapan profil" className="h-2 overflow-hidden rounded-full bg-muted">
              <div className="h-full bg-brand" style={{ width: `${profileDone}%` }} />
            </div>
            <p className="text-sm text-subtle">{profileDone}% selesai. Tambahkan keahlian yang ingin kamu pelajari.</p>
          </Card>

          <section aria-labelledby="aktif">
            <h2 id="aktif" className="mb-3 text-lg font-semibold">Aktivitas terbaru</h2>
            <Card>
              <ul className="divide-y divide-border">
                {ACTIVITY.map((a) => (
                  <li key={a.text} className="py-2 first:pt-0 last:pb-0"><p className="text-sm">{a.text}</p><p className="text-xs text-subtle">{a.time}</p></li>
                ))}
              </ul>
            </Card>
          </section>

          <Card>
            <h2 className="font-semibold">Tips bertukar dengan aman</h2>
            <ul className="list-disc space-y-1 pl-5 text-sm text-subtle">{TIPS.map((t) => <li key={t}>{t}</li>)}</ul>
          </Card>
        </aside>
      </div>
    </div>
  );
}