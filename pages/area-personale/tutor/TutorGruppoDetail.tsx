import React from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import PageHeader from "../../../features/area-personale/studente/components/PageHeader";
import TutorLessonStatusBadge from "../../../features/area-personale/tutor/components/TutorLessonStatusBadge";
import InfoNotice from "../../../features/area-personale/studente/components/InfoNotice";
import {
  getGroupById,
  getLessonsByGroup,
  getStudentsByGroup,
  MOCK_GUEST,
  MOCK_GROUP_VOTES,
  MOCK_PUBLISHED,
  MOCK_SUBMISSIONS,
  MOCK_TOPICS_COVERED,
  MOCK_TUTOR,
} from "../../../features/area-personale/tutor/data";
import { formatDate, formatTimeRange, formatDateShort } from "../../../features/area-personale/studente/utils/format";

const TutorGruppoDetail: React.FC = () => {
  const { groupId } = useParams<{ groupId: string }>();
  const group = groupId ? getGroupById(groupId) : undefined;

  if (!group) return <Navigate to="/area-personale/tutor/gruppi" replace />;

  const members = getStudentsByGroup(group.id);
  const guests = group.guestIds.map((id) => (id === MOCK_GUEST.id ? MOCK_GUEST : null)).filter(Boolean);
  const upcoming = getLessonsByGroup(group.id).filter((l) => l.status !== "svolta").slice(0, 3);
  const submissions = MOCK_SUBMISSIONS.filter((s) => s.groupId === group.id && s.status === "da_correggere");
  const materials = MOCK_PUBLISHED.filter((m) => m.target === group.name).slice(0, 3);

  return (
    <div>
      <Link to="/area-personale/tutor/gruppi" className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 mb-6">
        <ArrowLeft className="w-4 h-4" /> Torna ai gruppi
      </Link>

      <PageHeader title={group.name} description={`${group.subject} · Tutor: ${MOCK_TUTOR.displayName}`} />

      <div className="grid lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2 p-6 bg-white rounded-3xl border border-slate-100 space-y-4">
          <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-semibold border ${group.status === "aperto" ? "bg-emerald-50 text-emerald-700 border-emerald-100" : "bg-slate-100 text-slate-600 border-slate-200"}`}>
            {group.status === "aperto" ? "Aperto a nuovi ingressi" : "Chiuso"}
          </span>
          <p className="text-sm text-slate-600">Membri effettivi: {group.effectiveMembers} / {group.maxCapacity}</p>
          <div>
            <p className="text-xs font-bold uppercase text-slate-400 mb-2">Slot ricorrenti</p>
            <ul className="text-sm text-slate-600">{group.recurringSlots.map((s) => <li key={s}>{s}</li>)}</ul>
          </div>
          <div>
            <p className="text-xs font-bold uppercase text-slate-400 mb-2">Membri</p>
            <div className="flex flex-wrap gap-2">
              {members.map((m) => (
                <Link key={m.id} to={`/area-personale/tutor/gruppi/${group.id}/studente/${m.id}`} className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-blue-50 border border-blue-100 text-sm font-medium text-blue-800 hover:bg-blue-100">
                  <span className="w-7 h-7 rounded-full bg-white flex items-center justify-center text-xs font-bold">{m.initials}</span>
                  {m.displayName}
                </Link>
              ))}
            </div>
          </div>
          {guests.length > 0 && (
            <div>
              <p className="text-xs font-bold uppercase text-violet-600 mb-2">Guest (non contano come membri effettivi)</p>
              {guests.map((g) => g && (
                <Link key={g.id} to={`/area-personale/tutor/gruppi/${group.id}/studente/${g.id}`} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-violet-50 border border-violet-100 text-sm text-violet-800">
                  {g.displayName}
                </Link>
              ))}
            </div>
          )}
        </div>
        <div className="space-y-4">
          <InfoNotice>Il tutor non può modificare capienza, prezzi o wallet del gruppo.</InfoNotice>
        </div>
      </div>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-slate-900 mb-3">Prossime lezioni</h2>
        <div className="space-y-2">
          {upcoming.map((l) => (
            <Link key={l.id} to={`/area-personale/tutor/lezione/${l.id}`} className="flex justify-between items-center p-4 bg-white rounded-2xl border border-slate-100 hover:border-blue-100">
              <span className="text-sm">{formatDate(l.date)} · {formatTimeRange(l.startTime, l.endTime)}</span>
              <TutorLessonStatusBadge status={l.status} />
            </Link>
          ))}
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-slate-900 mb-3">Argomenti svolti</h2>
        <ul className="text-sm text-slate-600 list-disc pl-5">{MOCK_TOPICS_COVERED.map((t) => <li key={t}>{t}</li>)}</ul>
      </section>

      {submissions.length > 0 && (
        <section className="mb-8">
          <h2 className="text-lg font-bold text-slate-900 mb-3">Consegne da correggere ({submissions.length})</h2>
          {submissions.map((s) => (
            <p key={s.id} className="text-sm text-slate-600 py-1">{s.studentName}, {s.exerciseTitle}</p>
          ))}
        </section>
      )}

      {MOCK_GROUP_VOTES.length > 0 && (
        <section className="mb-8">
          <h2 className="text-lg font-bold text-slate-900 mb-3">Votazioni in corso</h2>
          {MOCK_GROUP_VOTES.map((v) => (
            <p key={v.id} className="text-sm p-3 bg-amber-50 rounded-xl border border-amber-100">{v.title}</p>
          ))}
        </section>
      )}

      <section>
        <h2 className="text-lg font-bold text-slate-900 mb-3">Materiali recenti</h2>
        {materials.map((m) => (
          <p key={m.id} className="text-sm text-slate-600">{m.title} · {formatDateShort(m.date)}</p>
        ))}
      </section>
    </div>
  );
};

export default TutorGruppoDetail;
