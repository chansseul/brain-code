// ── 사이드바 선택 ──
        const areaData = {
            '전두엽': { streak: 7, complete: 42, challenge: 18, play: 60, good: '전두엽', goodPct: 82, bad: '소뇌',   badPct: 38, ratio: '1.5', prevScore: 40, thisScore: 60, scores: [55,60,58,70,65,75,60], prevScores: [40,42,38,45,50,42,40] },
            '소뇌':  { streak: 3, complete: 28, challenge: 10, play: 38, good: '소뇌',   goodPct: 65, bad: '측두엽', badPct: 44, ratio: '1.2', prevScore: 35, thisScore: 42, scores: [40,38,42,45,50,44,42], prevScores: [30,32,28,35,38,34,35] },
            '해마':   { streak: 5, complete: 35, challenge: 14, play: 49, good: '해마',   goodPct: 75, bad: '두정엽', badPct: 50, ratio: '1.3', prevScore: 50, thisScore: 65, scores: [58,62,60,68,65,72,65], prevScores: [48,50,46,52,55,50,50] },
            '후두엽': { streak: 1, complete: 15, challenge: 6,  play: 21, good: '후두엽', goodPct: 60, bad: '해마',   badPct: 48, ratio: '1.1', prevScore: 38, thisScore: 42, scores: [40,38,44,42,46,44,42], prevScores: [36,34,38,36,40,38,38] },
            '두정엽': { streak: 2, complete: 20, challenge: 8,  play: 28, good: '두정엽', goodPct: 70, bad: '전두엽', badPct: 55, ratio: '1.1', prevScore: 45, thisScore: 50, scores: [48,50,52,55,50,54,50], prevScores: [42,44,40,46,48,44,45] },
        };

        let currentArea = '전두엽';

        function selectArea(el, area) {
            document.querySelectorAll('.sidebar-item').forEach(i => i.classList.remove('active'));
            el.classList.add('active');
            currentArea = area;
            updateStats(area);
        }

        function updateStats(area) {
            const d = areaData[area];
            document.getElementById('area-title').textContent = area;
            document.getElementById('area-desc').textContent = `인지·집중 훈련 영역 · 연속훈련 🔥 D+${d.streak}`;
            document.querySelector('.streak-num').textContent = `🔥 ${d.streak}`;
            document.getElementById('stat-complete').innerHTML = `${d.complete}<span>H</span>`;
            document.getElementById('stat-challenge').innerHTML = `${d.challenge}<span>H</span>`;
            document.getElementById('stat-play').innerHTML = `${d.play}<span>회</span>`;
            document.getElementById('good-area').textContent = d.good;
            document.getElementById('bad-area').textContent = d.bad;
            document.getElementById('good-bar').style.width = d.goodPct + '%';
            document.getElementById('bad-bar').style.width = d.badPct + '%';
            // 점수 비교
            const diff = d.thisScore - d.prevScore;
            document.getElementById('prev-score').textContent = d.prevScore;
            document.getElementById('this-score').textContent = d.thisScore;
            document.getElementById('this-score').style.color = diff >= 0 ? 'var(--green)' : 'var(--danger)';
            const arrow = document.getElementById('compare-arrow');
            arrow.textContent = diff >= 0 ? `↑ +${diff}` : `↓ ${diff}`;
            arrow.style.color = diff >= 0 ? 'var(--green)' : 'var(--danger)';
            document.getElementById('compare-sub').textContent = diff >= 0
                ? `이번 주가 ${diff}점 올랐어요 📈`
                : `이번 주가 ${Math.abs(diff)}점 내렸어요 📉`;
            buildChart(d.scores, d.prevScores);
        }

        // ── 차트 ──
        function buildChart(scores, prevScores) {
            const days = ['월','화','수','목','금','토','일'];
            const max = Math.max(...scores, ...prevScores) * 1.1;
            const area = document.getElementById('chart-area');
            area.innerHTML = '';
            days.forEach((day, i) => {
                const col = document.createElement('div');
                col.className = 'bar-col';

                const thisH = Math.round((scores[i] / max) * 90);
                const prevH = Math.round((prevScores[i] / max) * 90);

                col.innerHTML = `
                    <div style="display:flex; align-items:flex-end; gap:3px; height:90px;">
                        <div class="bar prev" style="height:${prevH}px; flex:1;"></div>
                        <div class="bar this" style="height:${thisH}px; flex:1;"></div>
                    </div>
                    <div class="bar-label">${day}</div>
                `;
                area.appendChild(col);
            });
        }

        // ── 설정 모달 ──
        function openSettingsModal() {
            const m = document.getElementById('modal');
            m.style.display = 'flex';
            requestAnimationFrame(() => m.classList.add('open'));
        }
        function closeModal() {
            const m = document.getElementById('modal');
            m.classList.remove('open');
            m.style.display = 'none';
        }
        function handleBackdrop(e) {
            if (e.target === document.getElementById('modal')) closeModal();
        }
        document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

        function switchSettingTab(tabId, btnEl) {
            document.querySelectorAll('.s-tab-panel').forEach(p => p.classList.remove('active'));
            document.querySelectorAll('.s-tab-btn').forEach(b => b.classList.remove('active'));
            document.getElementById('stab-' + tabId).classList.add('active');
            btnEl.classList.add('active');
        }
        function selectSettingSeg(btnEl) {
            btnEl.closest('.s-seg').querySelectorAll('.s-seg-btn').forEach(b => b.classList.remove('active'));
            btnEl.classList.add('active');
        }

        // ── 초기화 ──
        buildChart(areaData['전두엽'].scores, areaData['전두엽'].prevScores);