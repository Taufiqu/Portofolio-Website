"use client";

import React, { useState, useEffect } from 'react';

export default function TelemetryCounter() {
  const [stats, setStats] = useState({ total: 1, live: 1 });

  useEffect(() => {
    // 1. Resolve or generate a session ID stored in sessionStorage
    let sessionId = sessionStorage.getItem('taufiqu_session_id');
    if (!sessionId) {
      sessionId = 'sess_' + Math.random().toString(36).substring(2, 15) + Date.now().toString(36);
      sessionStorage.setItem('taufiqu_session_id', sessionId);
    }

    // 2. Send heartbeat payload
    const sendHeartbeat = async () => {
      try {
        await fetch('/api/heartbeat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ sessionId })
        });
      } catch (err) {
        console.error('Telemetry heartbeat failure:', err);
      }
    };

    // 3. Fetch aggregated stats
    const fetchStats = async () => {
      try {
        const res = await fetch('/api/visitors');
        if (res.ok) {
          const data = await res.json();
          setStats({
            total: data.total || 1,
            live: data.live || 1
          });
        }
      } catch (err) {
        console.error('Telemetry fetch failure:', err);
      }
    };

    // 4. Run initial registration
    sendHeartbeat().then(() => {
      fetchStats();
    });

    // 5. Establish heartbeat cycle (every 20 seconds, well within the 40s active window)
    const heartbeatInterval = setInterval(sendHeartbeat, 20000);
    const statsInterval = setInterval(fetchStats, 20000);

    return () => {
      clearInterval(heartbeatInterval);
      clearInterval(statsInterval);
    };
  }, []);

  return (
    <div className="flex items-center gap-3 font-mono text-[9px] text-zinc-500 uppercase tracking-widest select-none">
      <span>Live: {stats.live}</span>
      <span className="text-zinc-800">/</span>
      <span>Total Visits: {stats.total}</span>
    </div>
  );
}
