/**
 * Web Audio API ambient sound generator for the Minn Kasai architectural walkthrough.
 * Generates an ethereal, calming warm harmonic drone inspired by modern Tokyo evening sanctuaries.
 * Safe, zero external network requests.
 */

class TourAudioAmbience {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private osc1: OscillatorNode | null = null;
  private osc2: OscillatorNode | null = null;
  private isPlaying: boolean = false;

  public init() {
    if (this.ctx) return;
    try {
      const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtxClass();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.001, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    } catch {
      // Audio not supported in environment
    }
  }

  public toggle(): boolean {
    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      this.start();
      return true;
    }
  }

  public start() {
    this.init();
    if (!this.ctx || !this.masterGain) return;

    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    // Stop prior if running
    this.stopInternal();

    const now = this.ctx.currentTime;

    // Soft warm pentatonic chord (Tokyo sanctuary warmth)
    this.osc1 = this.ctx.createOscillator();
    this.osc1.type = 'sine';
    this.osc1.frequency.setValueAtTime(174.61, now); // F3 note

    this.osc2 = this.ctx.createOscillator();
    this.osc2.type = 'triangle';
    this.osc2.frequency.setValueAtTime(261.63, now); // C4 note

    // Sub filter for velvet warmth
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(450, now);

    this.osc1.connect(filter);
    this.osc2.connect(filter);
    filter.connect(this.masterGain);

    // Fade in gracefully
    this.masterGain.gain.cancelScheduledValues(now);
    this.masterGain.gain.setValueAtTime(0.001, now);
    this.masterGain.gain.exponentialRampToValueAtTime(0.06, now + 1.8);

    this.osc1.start(now);
    this.osc2.start(now);
    this.isPlaying = true;
  }

  private stopInternal() {
    if (this.osc1) {
      try { this.osc1.stop(); } catch { /* empty */ }
      this.osc1.disconnect();
      this.osc1 = null;
    }
    if (this.osc2) {
      try { this.osc2.stop(); } catch { /* empty */ }
      this.osc2.disconnect();
      this.osc2 = null;
    }
  }

  public stop() {
    if (!this.ctx || !this.masterGain || !this.isPlaying) return;
    const now = this.ctx.currentTime;
    this.masterGain.gain.cancelScheduledValues(now);
    this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, now);
    this.masterGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.8);
    setTimeout(() => {
      this.stopInternal();
      this.isPlaying = false;
    }, 850);
  }

  public getStatus(): boolean {
    return this.isPlaying;
  }
}

export const tourAudio = new TourAudioAmbience();
