/**
 * Pure Web Audio API synthesized sound generator.
 * Zero external audio files required. Completely lightweight and instantaneous.
 * Disabled by default; user can enable it via Navbar or Command Palette.
 */

class SoundFx {
  private ctx: AudioContext | null = null
  private enabled: boolean = false

  constructor() {
    if (typeof window !== 'undefined') {
      this.enabled = localStorage.getItem('sound_fx') === 'true'
    }
  }

  public isEnabled(): boolean {
    return this.enabled
  }

  public toggle(): boolean {
    this.enabled = !this.enabled
    if (typeof window !== 'undefined') {
      localStorage.setItem('sound_fx', String(this.enabled))
    }
    if (this.enabled) {
      this.playTone(880, 0.08, 'sine', 0.05)
    }
    return this.enabled
  }

  private initCtx() {
    if (typeof window === 'undefined') return
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
      if (AudioCtx) {
        this.ctx = new AudioCtx()
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume()
    }
  }

  public playTone(freq: number, duration: number, type: OscillatorType = 'sine', volume: number = 0.04) {
    if (!this.enabled) return
    try {
      this.initCtx()
      if (!this.ctx) return
      const osc = this.ctx.createOscillator()
      const gain = this.ctx.createGain()
      osc.type = type
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime)
      gain.gain.setValueAtTime(volume, this.ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration)
      osc.connect(gain)
      gain.connect(this.ctx.destination)
      osc.start()
      osc.stop(this.ctx.currentTime + duration)
    } catch {
      // AudioContext not allowed or unsupported
    }
  }

  public click() {
    this.playTone(1000, 0.03, 'sine', 0.03)
  }

  public tab() {
    this.playTone(700, 0.04, 'triangle', 0.03)
  }

  public terminalKey() {
    this.playTone(650 + Math.random() * 180, 0.02, 'triangle', 0.02)
  }

  public success() {
    if (!this.enabled) return
    this.playTone(523.25, 0.06, 'sine', 0.03)
    setTimeout(() => this.playTone(659.25, 0.09, 'sine', 0.04), 60)
  }
}

export const soundFx = new SoundFx()
