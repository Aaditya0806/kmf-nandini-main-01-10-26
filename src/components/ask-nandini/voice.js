// Voice input for Ask Nandini. Today: the browser's Web Speech API.
// A provider such as Sarvam AI can be added later by returning another object
// with the same shape from createVoiceInput(); the chat panel only uses:
//   { supported, start(), stop() } with onResult(text, isFinal) / onEnd() / onError(code)

function browserRecognition() {
  if (typeof window === 'undefined') return null;
  return window.SpeechRecognition || window.webkitSpeechRecognition || null;
}

export function voiceSupported() {
  return !!browserRecognition();
}

export function createVoiceInput({ lang = 'en-IN', onResult, onEnd, onError }) {
  const Recognition = browserRecognition();
  if (!Recognition) return { supported: false, start() {}, stop() {} };

  const rec = new Recognition();
  rec.lang = lang;
  rec.interimResults = true;
  rec.continuous = false;
  rec.maxAlternatives = 1;

  rec.onresult = (e) => {
    let text = '';
    let isFinal = false;
    for (let i = e.resultIndex; i < e.results.length; i++) {
      text += e.results[i][0].transcript;
      if (e.results[i].isFinal) isFinal = true;
    }
    onResult?.(text.trim(), isFinal);
  };
  rec.onerror = (e) => onError?.(e.error || 'error');
  rec.onend = () => onEnd?.();

  return {
    supported: true,
    start() {
      try {
        rec.start();
      } catch (e) {
        onError?.('start_failed');
      }
    },
    stop() {
      try {
        rec.stop();
      } catch (e) {
        // already stopped
      }
    },
  };
}
