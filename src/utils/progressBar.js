import { SingleBar, Presets } from 'cli-progress';

class ProgressBar {
  constructor() {
    this.progressBar = new SingleBar(
      {
        format:
          '# {filename} | {percentage}% | {speed} | {size} | {currentLength}/{length} ',
        barCompleteChar: ' ', // Mengatur karakter progres lengkap menjadi spasi
        barIncompleteChar: ' ', // Mengatur karakter progres tidak lengkap menjadi spasi
        hideCursor: true,
        clearOnComplete: true,
      },
      Presets.shades_classic
    );
  }

  start(total, messageOptions) {
    this.progressBar.start(total, 0, messageOptions);
  }

  update(current, speed, currentLength, length, messageOptions) {
    this.progressBar.update(current, {
      speed,
      currentLength,
      length,
      ...messageOptions,
    });
  }

  complete() {
    this.progressBar.stop();
  }
}
export default ProgressBar;
