/**
 * Web Audio API synthesizer for emergency siren sound
 */

class AudioAlarmService {
  private audioCtx: AudioContext | null = null;
  private osc: OscillatorNode | null = null;
  private gainNode: GainNode | null = null;
  private isAlarmRunning = false;
  private intervalId: any = null;

  public startSiren(): boolean {
    if (this.isAlarmRunning) return true;

    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContextClass) return false;

      this.audioCtx = new AudioContextClass();
      if (this.audioCtx.state === 'suspended') {
        this.audioCtx.resume();
      }

      this.osc = this.audioCtx.createOscillator();
      this.gainNode = this.audioCtx.createGain();

      this.osc.type = 'sawtooth';
      this.osc.frequency.setValueAtTime(600, this.audioCtx.currentTime);

      this.gainNode.gain.setValueAtTime(0.3, this.audioCtx.currentTime);

      this.osc.connect(this.gainNode);
      this.gainNode.connect(this.audioCtx.destination);

      this.osc.start();
      this.isAlarmRunning = true;

      // Oscillate frequency between 600Hz and 1200Hz to create standard emergency siren
      let high = false;
      this.intervalId = setInterval(() => {
        if (!this.audioCtx || !this.osc) return;
        const targetFreq = high ? 650 : 1150;
        this.osc.frequency.setTargetAtTime(targetFreq, this.audioCtx.currentTime, 0.2);
        high = !high;
      }, 400);

      return true;
    } catch (e) {
      console.warn('AudioContext failed:', e);
      return false;
    }
  }

  public stopSiren(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }

    if (this.osc) {
      try {
        this.osc.stop();
        this.osc.disconnect();
      } catch {
        // ignore
      }
      this.osc = null;
    }

    if (this.gainNode) {
      try {
        this.gainNode.disconnect();
      } catch {
        // ignore
      }
      this.gainNode = null;
    }

    if (this.audioCtx) {
      try {
        this.audioCtx.close();
      } catch {
        // ignore
      }
      this.audioCtx = null;
    }

    this.isAlarmRunning = false;
  }

  public isPlaying(): boolean {
    return this.isAlarmRunning;
  }
}

export const audioAlarmService = new AudioAlarmService();
