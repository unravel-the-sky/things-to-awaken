export function formatString(text: string) {
    var outputText = text.replace(" ", "-");
    var outputText = outputText.replace("_", "-");
    var outputText = outputText.toLowerCase();
  
    return outputText;
  }
  
  export const DEFAULT_MAILSENDER_MAIL = 'MS_BEwv8P@trial-pxkjn413n99gz781.mlsender.net'