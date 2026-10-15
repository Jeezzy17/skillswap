import type { ChatMsg, Member, SwapSession } from "@/types/member";
export const members: Member[] = [
  { id: "1", name: "Dimas Kuncoro", role: "Fotografer", category: "kreatif", skills: ["Fotografi", "Editing"], wants: "Public speaking", rating: 4.9, sessions: 32, bio: "Fotografer lepas, senang berbagi teknik cahaya alami." },
  { id: "2", name: "Michoyan Husna", role: "Pembicara", category: "komunikasi", skills: ["Public speaking", "Storytelling"], wants: "Desain UI", rating: 4.8, sessions: 21, bio: "Mentor debat kampus dan pembawa acara komunitas." },
  { id: "3", name: "Marsha Maharani", role: "Data Analyst", category: "data", skills: ["Data viz", "Excel"], wants: "Fotografi", rating: 4.7, sessions: 18, bio: "Mengubah data menjadi cerita yang mudah dipahami." },
  { id: "4", name: "Bimo Aryo", role: "UI Designer", category: "kreatif", skills: ["Desain UI", "Figma"], wants: "Data viz", rating: 4.8, sessions: 27, bio: "Desainer produk yang suka prototipe cepat." },
  { id: "5", name: "Nurul", role: "Penulis", category: "komunikasi", skills: ["Copywriting", "Storytelling"], wants: "Excel", rating: 4.6, sessions: 12, bio: "Penulis konten untuk startup dan komunitas." },
  { id: "6", name: "Bomboroni", role: "Developer", category: "teknologi", skills: ["Next.js", "TypeScript"], wants: "Copywriting", rating: 4.9, sessions: 40, bio: "Frontend developer, suka mengajar dasar web." },
];
export const sessions: SwapSession[] = [
  { id: "s1", withId: "1", topic: "Fotografi ↔ Public speaking", when: "Sabtu, 10:00", status: "dijadwalkan" },
  { id: "s2", withId: "4", topic: "Desain UI ↔ Data viz", when: "Kemarin, 15:00", status: "selesai" },
];
export const chats: Record<string, ChatMsg[]> = {
  "1": [{ from: "them", text: "Hai! Sabtu ini bisa tukar sesi fotografi?" }, { from: "me", text: "Bisa, jam 10 ya." }],
  "2": [{ from: "them", text: "Terima kasih sudah mengajukan sesi!" }],
};
export const responseTrend = [
  { day: "Sen", rate: 52 }, { day: "Sel", rate: 55 }, { day: "Rab", rate: 58 }, { day: "Kam", rate: 61 },
  { day: "Jum", rate: 59 }, { day: "Sab", rate: 64 }, { day: "Min", rate: 66 },
];
