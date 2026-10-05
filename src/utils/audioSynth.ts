/**
 * Web Audio API synthesizer for interactive toy sound testing.
 * All sound is synthesized programmatically with zero external audio assets.
 */

let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioCtxClass) {
      audioCtx = new AudioCtxClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

export function playToySound(type: 'musicbox' | 'train' | 'chime' | 'rattle' | 'robot') {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;

    switch (type) {
      case 'musicbox': {
        // Pentatonic celesta melody: C5, E5, G5, B5, C6
        const notes = [523.25, 659.25, 783.99, 987.77, 1046.5];
        notes.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, now + idx * 0.18);

          gain.gain.setValueAtTime(0, now + idx * 0.18);
          gain.gain.linearRampToValueAtTime(0.2, now + idx * 0.18 + 0.02);
          gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.18 + 0.8);

          osc.connect(gain);
          gain.connect(ctx.destination);

          osc.start(now + idx * 0.18);
          osc.stop(now + idx * 0.18 + 0.85);
        });
        break;
      }

      case 'train': {
        // Wooden train whistle (dual harmonic tone) + rhythmic puff
        const osc1 = ctx.createOscillator();
        const osc2 = ctx.createOscillator();
        const gain = ctx.createGain();

        osc1.type = 'triangle';
        osc2.type = 'triangle';
        osc1.frequency.setValueAtTime(440, now);
        osc2.frequency.setValueAtTime(554.37, now); // major 3rd whistle

        gain.gain.setValueAtTime(0, now);
        gain.gain.linearRampToValueAtTime(0.18, now + 0.05);
        gain.gain.setValueAtTime(0.18, now + 0.35);
        gain.gain.linearRampToValueAtTime(0.05, now + 0.45);
        gain.gain.linearRampToValueAtTime(0.22, now + 0.55);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 1.1);

        osc1.connect(gain);
        osc2.connect(gain);
        gain.connect(ctx.destination);

        osc1.start(now);
        osc2.start(now);
        osc1.stop(now + 1.15);
        osc2.stop(now + 1.15);
        break;
      }

      case 'chime': {
        // Shimmering bell chime
        const freqs = [1046.5, 1318.51, 1567.98, 2093.0];
        freqs.forEach((f, i) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(f, now + i * 0.08);

          gain.gain.setValueAtTime(0.15, now + i * 0.08);
          gain.gain.exponentialRampToValueAtTime(0.0005, now + i * 0.08 + 1.2);

          osc.connect(gain);
          gain.connect(ctx.destination);

          osc.start(now + i * 0.08);
          osc.stop(now + i * 0.08 + 1.25);
        });
        break;
      }

      case 'rattle': {
        // Wooden shaker clicks
        for (let i = 0; i < 4; i++) {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'square';
          osc.frequency.setValueAtTime(220 + i * 50, now + i * 0.12);

          gain.gain.setValueAtTime(0.08, now + i * 0.12);
          gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.12 + 0.06);

          osc.connect(gain);
          gain.connect(ctx.destination);

          osc.start(now + i * 0.12);
          osc.stop(now + i * 0.12 + 0.07);
        }
        break;
      }

      case 'robot': {
        // Friendly retro robot arpeggio
        const tones = [440, 554, 659, 880];
        tones.forEach((t, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sawtooth';
          osc.frequency.setValueAtTime(t, now + idx * 0.09);

          gain.gain.setValueAtTime(0.09, now + idx * 0.09);
          gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.09 + 0.15);

          osc.connect(gain);
          gain.connect(ctx.destination);

          osc.start(now + idx * 0.09);
          osc.stop(now + idx * 0.09 + 0.16);
        });
        break;
      }
    }
  } catch (err) {
    console.debug('Audio play not allowed or failed:', err);
  }
}
