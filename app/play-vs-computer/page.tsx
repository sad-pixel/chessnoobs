'use client'

import {AnalysisBoard} from '@/components/analysis-board';

export default function AnalysisPage() {
  return (
    <div className="container">
      <AnalysisBoard playVsEngine={true}/>
    </div>
  );
}
