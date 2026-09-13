import React from 'react';
import { getTournamentById } from '@/actions/tournament.actions';
import { RegisterTournamentForm } from '@/components/forms/RegisterTournamentForm';

export const dynamic = 'force-dynamic';

export default async function RegisterTournamentPage({ params }: { params: { id: string } }) {
  // Fetch real tournament details
  const tournament = await getTournamentById(params.id);

  if (!tournament) {
    return (
      <div className="py-24 text-center flex flex-col items-center justify-center bg-ms-true-black border border-ms-border-dark max-w-4xl mx-auto mt-10">
        <div className="font-ascii text-ms-white-30 mb-4 text-xs">
          <pre>
{`[ ERROR 404: TOURNAMENT NOT FOUND ]`}
          </pre>
        </div>
        <p className="font-orbitron text-ms-white-60 uppercase text-sm">
          The requested tournament ID does not exist in the database.
        </p>
      </div>
    );
  }

  return <RegisterTournamentForm tournament={tournament} />;
}
