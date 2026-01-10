// 요소 가져오기
const textInput = document.getElementById('textInput');
const preview = document.getElementById('preview');
const fontButtons = document.querySelectorAll('.font-btn');
const fontSizeSlider = document.getElementById('fontSize');
const sizeValue = document.getElementById('sizeValue');
const copyBtn = document.getElementById('copyBtn');

// 현재 선택된 유니코드 스타일 저장
let currentUnicodeStyle = null;
let originalText = 'Hello World! 123';

// 텍스트 입력 이벤트
textInput.addEventListener('input', function() {
    originalText = this.value || 'Hello World! 123';
    updatePreview();
});

// 미리보기 업데이트 함수
function updatePreview() {
    if (currentUnicodeStyle) {
        preview.textContent = convertToUnicode(originalText, currentUnicodeStyle);
    } else {
        preview.textContent = originalText;
    }
}

// 유니코드 버튼 클릭 이벤트
fontButtons.forEach(button => {
    button.addEventListener('click', function() {
        const unicodeStyle = this.getAttribute('data-unicode');

        fontButtons.forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');
        currentUnicodeStyle = unicodeStyle;
        updatePreview();
    });
});

// 글자 크기 조절 이벤트
fontSizeSlider.addEventListener('input', function() {
    const size = this.value;
    sizeValue.textContent = size;
    preview.style.fontSize = size + 'px';
});

// 유니코드 변환 함수
function convertToUnicode(text, style) {
    const unicodeMap = {
        'bold': { offset: 0x1D5D4, numbers: 0x1D7CE },
        'italic': { offset: 0x1D608, numbers: null },
        'bold-italic': { offset: 0x1D63C, numbers: null },
        'script': { offset: 0x1D49C, numbers: null },
        'script-bold': { offset: 0x1D4D0, numbers: null },
        'fraktur': { offset: 0x1D504, numbers: null },
        'fraktur-bold': { offset: 0x1D56C, numbers: null },
        'double': { offset: 0x1D538, numbers: 0x1D7D8 },
        'monospace': { offset: 0x1D670, numbers: 0x1D7F6 },
        'sans': { offset: 0x1D5A0, numbers: 0x1D7E2 },
        'sans-italic': { offset: 0x1D608, numbers: null },
        'sans-bold-italic': { offset: 0x1D63C, numbers: null },
        'serif-bold': { offset: 0x1D400, numbers: 0x1D7CE },
        'serif-italic': { offset: 0x1D434, numbers: null },
        'serif-bold-italic': { offset: 0x1D468, numbers: null }
    };

    const circleMap = {
        'a': 'ⓐ', 'b': 'ⓑ', 'c': 'ⓒ', 'd': 'ⓓ', 'e': 'ⓔ', 'f': 'ⓕ', 'g': 'ⓖ', 'h': 'ⓗ', 'i': 'ⓘ', 'j': 'ⓙ',
        'k': 'ⓚ', 'l': 'ⓛ', 'm': 'ⓜ', 'n': 'ⓝ', 'o': 'ⓞ', 'p': 'ⓟ', 'q': 'ⓠ', 'r': 'ⓡ', 's': 'ⓢ', 't': 'ⓣ',
        'u': 'ⓤ', 'v': 'ⓥ', 'w': 'ⓦ', 'x': 'ⓧ', 'y': 'ⓨ', 'z': 'ⓩ',
        'A': 'Ⓐ', 'B': 'Ⓑ', 'C': 'Ⓒ', 'D': 'Ⓓ', 'E': 'Ⓔ', 'F': 'Ⓕ', 'G': 'Ⓖ', 'H': 'Ⓗ', 'I': 'Ⓘ', 'J': 'Ⓙ',
        'K': 'Ⓚ', 'L': 'Ⓛ', 'M': 'Ⓜ', 'N': 'Ⓝ', 'O': 'Ⓞ', 'P': 'Ⓟ', 'Q': 'Ⓠ', 'R': 'Ⓡ', 'S': 'Ⓢ', 'T': 'Ⓣ',
        'U': 'Ⓤ', 'V': 'Ⓥ', 'W': 'Ⓦ', 'X': 'Ⓧ', 'Y': 'Ⓨ', 'Z': 'Ⓩ',
        '0': '⓪', '1': '①', '2': '②', '3': '③', '4': '④', '5': '⑤', '6': '⑥', '7': '⑦', '8': '⑧', '9': '⑨'
    };

    const squareMap = {
        'a': '🄰', 'b': '🄱', 'c': '🄲', 'd': '🄳', 'e': '🄴', 'f': '🄵', 'g': '🄶', 'h': '🄷', 'i': '🄸', 'j': '🄹',
        'k': '🄺', 'l': '🄻', 'm': '🄼', 'n': '🄽', 'o': '🄾', 'p': '🄿', 'q': '🅀', 'r': '🅁', 's': '🅂', 't': '🅃',
        'u': '🅄', 'v': '🅅', 'w': '🅆', 'x': '🅇', 'y': '🅈', 'z': '🅉',
        'A': '🄰', 'B': '🄱', 'C': '🄲', 'D': '🄳', 'E': '🄴', 'F': '🄵', 'G': '🄶', 'H': '🄷', 'I': '🄸', 'J': '🄹',
        'K': '🄺', 'L': '🄻', 'M': '🄼', 'N': '🄽', 'O': '🄾', 'P': '🄿', 'Q': '🅀', 'R': '🅁', 'S': '🅂', 'T': '🅃',
        'U': '🅄', 'V': '🅅', 'W': '🅆', 'X': '🅇', 'Y': '🅈', 'Z': '🅉'
    };

    const circleBlackMap = {
        'a': '🅐', 'b': '🅑', 'c': '🅒', 'd': '🅓', 'e': '🅔', 'f': '🅕', 'g': '🅖', 'h': '🅗', 'i': '🅘', 'j': '🅙',
        'k': '🅚', 'l': '🅛', 'm': '🅜', 'n': '🅝', 'o': '🅞', 'p': '🅟', 'q': '🅠', 'r': '🅡', 's': '🅢', 't': '🅣',
        'u': '🅤', 'v': '🅥', 'w': '🅦', 'x': '🅧', 'y': '🅨', 'z': '🅩',
        'A': '🅐', 'B': '🅑', 'C': '🅒', 'D': '🅓', 'E': '🅔', 'F': '🅕', 'G': '🅖', 'H': '🅗', 'I': '🅘', 'J': '🅙',
        'K': '🅚', 'L': '🅛', 'M': '🅜', 'N': '🅝', 'O': '🅞', 'P': '🅟', 'Q': '🅠', 'R': '🅡', 'S': '🅢', 'T': '🅣',
        'U': '🅤', 'V': '🅥', 'W': '🅦', 'X': '🅧', 'Y': '🅨', 'Z': '🅩'
    };

    const parenthesisMap = {
        'a': '⒜', 'b': '⒝', 'c': '⒞', 'd': '⒟', 'e': '⒠', 'f': '⒡', 'g': '⒢', 'h': '⒣', 'i': '⒤', 'j': '⒥',
        'k': '⒦', 'l': '⒧', 'm': '⒨', 'n': '⒩', 'o': '⒪', 'p': '⒫', 'q': '⒬', 'r': '⒭', 's': '⒮', 't': '⒯',
        'u': '⒰', 'v': '⒱', 'w': '⒲', 'x': '⒳', 'y': '⒴', 'z': '⒵',
        'A': '⒜', 'B': '⒝', 'C': '⒞', 'D': '⒟', 'E': '⒠', 'F': '⒡', 'G': '⒢', 'H': '⒣', 'I': '⒤', 'J': '⒥',
        'K': '⒦', 'L': '⒧', 'M': '⒨', 'N': '⒩', 'O': '⒪', 'P': '⒫', 'Q': '⒬', 'R': '⒭', 'S': '⒮', 'T': '⒯',
        'U': '⒰', 'V': '⒱', 'W': '⒲', 'X': '⒳', 'Y': '⒴', 'Z': '⒵'
    };

    const upsideDownMap = {
        'a': 'ɐ', 'b': 'q', 'c': 'ɔ', 'd': 'p', 'e': 'ǝ', 'f': 'ɟ', 'g': 'ƃ', 'h': 'ɥ', 'i': 'ᴉ', 'j': 'ɾ',
        'k': 'ʞ', 'l': 'l', 'm': 'ɯ', 'n': 'u', 'o': 'o', 'p': 'd', 'q': 'b', 'r': 'ɹ', 's': 's', 't': 'ʇ',
        'u': 'n', 'v': 'ʌ', 'w': 'ʍ', 'x': 'x', 'y': 'ʎ', 'z': 'z',
        'A': '∀', 'B': 'q', 'C': 'Ɔ', 'D': 'p', 'E': 'Ǝ', 'F': 'Ⅎ', 'G': '⅁', 'H': 'H', 'I': 'I', 'J': 'ſ',
        'K': 'ʞ', 'L': '˥', 'M': 'W', 'N': 'N', 'O': 'O', 'P': 'Ԁ', 'Q': 'Ὸ', 'R': 'ɹ', 'S': 'S', 'T': '⊥',
        'U': '∩', 'V': 'Λ', 'W': 'M', 'X': 'X', 'Y': '⅄', 'Z': 'Z',
        '0': '0', '1': 'Ɩ', '2': 'ᄅ', '3': 'Ɛ', '4': 'ㄣ', '5': 'ϛ', '6': '9', '7': 'ㄥ', '8': '8', '9': '6'
    };

    const superscriptMap = {
        'a': 'ᵃ', 'b': 'ᵇ', 'c': 'ᶜ', 'd': 'ᵈ', 'e': 'ᵉ', 'f': 'ᶠ', 'g': 'ᵍ', 'h': 'ʰ', 'i': 'ⁱ', 'j': 'ʲ',
        'k': 'ᵏ', 'l': 'ˡ', 'm': 'ᵐ', 'n': 'ⁿ', 'o': 'ᵒ', 'p': 'ᵖ', 'q': 'ᵠ', 'r': 'ʳ', 's': 'ˢ', 't': 'ᵗ',
        'u': 'ᵘ', 'v': 'ᵛ', 'w': 'ʷ', 'x': 'ˣ', 'y': 'ʸ', 'z': 'ᶻ',
        'A': 'ᴬ', 'B': 'ᴮ', 'C': 'ᶜ', 'D': 'ᴰ', 'E': 'ᴱ', 'F': 'ᶠ', 'G': 'ᴳ', 'H': 'ᴴ', 'I': 'ᴵ', 'J': 'ᴶ',
        'K': 'ᴷ', 'L': 'ᴸ', 'M': 'ᴹ', 'N': 'ᴺ', 'O': 'ᴼ', 'P': 'ᴾ', 'Q': 'Q', 'R': 'ᴿ', 'S': 'ˢ', 'T': 'ᵀ',
        'U': 'ᵁ', 'V': 'ⱽ', 'W': 'ᵂ', 'X': 'ˣ', 'Y': 'ʸ', 'Z': 'ᶻ',
        '0': '⁰', '1': '¹', '2': '²', '3': '³', '4': '⁴', '5': '⁵', '6': '⁶', '7': '⁷', '8': '⁸', '9': '⁹'
    };

    const subscriptMap = {
        'a': 'ₐ', 'b': 'b', 'c': 'c', 'd': 'd', 'e': 'ₑ', 'f': 'f', 'g': 'g', 'h': 'ₕ', 'i': 'ᵢ', 'j': 'ⱼ',
        'k': 'ₖ', 'l': 'ₗ', 'm': 'ₘ', 'n': 'ₙ', 'o': 'ₒ', 'p': 'ₚ', 'q': 'q', 'r': 'ᵣ', 's': 'ₛ', 't': 'ₜ',
        'u': 'ᵤ', 'v': 'ᵥ', 'w': 'w', 'x': 'ₓ', 'y': 'y', 'z': 'z',
        '0': '₀', '1': '₁', '2': '₂', '3': '₃', '4': '₄', '5': '₅', '6': '₆', '7': '₇', '8': '₈', '9': '₉'
    };

    const smallCapsMap = {
        'a': 'ᴀ', 'b': 'ʙ', 'c': 'ᴄ', 'd': 'ᴅ', 'e': 'ᴇ', 'f': 'ꜰ', 'g': 'ɢ', 'h': 'ʜ', 'i': 'ɪ', 'j': 'ᴊ',
        'k': 'ᴋ', 'l': 'ʟ', 'm': 'ᴍ', 'n': 'ɴ', 'o': 'ᴏ', 'p': 'ᴘ', 'q': 'ǫ', 'r': 'ʀ', 's': 's', 't': 'ᴛ',
        'u': 'ᴜ', 'v': 'ᴠ', 'w': 'ᴡ', 'x': 'x', 'y': 'ʏ', 'z': 'ᴢ'
    };

    const slashMap = {
        'a': 'Ⱥ', 'b': 'ƀ', 'c': 'ȼ', 'd': 'đ', 'e': 'ɇ', 'f': 'ϝ', 'g': 'ǥ', 'h': 'ħ', 'i': 'ɨ', 'j': 'ɉ',
        'k': 'ꝁ', 'l': 'ł', 'm': 'm', 'n': 'n', 'o': 'ø', 'p': 'ᵽ', 'q': 'ꝗ', 'r': 'ɍ', 's': 's', 't': 'ŧ',
        'u': 'ᵾ', 'v': 'v', 'w': 'w', 'x': 'x', 'y': 'ɏ', 'z': 'ƶ',
        'A': 'Ⱥ', 'B': 'Ƀ', 'C': 'Ȼ', 'D': 'Đ', 'E': 'Ɇ', 'F': 'Ϝ', 'G': 'Ǥ', 'H': 'Ħ', 'I': 'Ɨ', 'J': 'Ɉ',
        'K': 'Ꝁ', 'L': 'Ł', 'M': 'M', 'N': 'N', 'O': 'Ø', 'P': 'Ᵽ', 'Q': 'Ꝗ', 'R': 'Ɍ', 'S': 'S', 'T': 'Ŧ',
        'U': 'ᵾ', 'V': 'V', 'W': 'W', 'X': 'X', 'Y': 'Ɏ', 'Z': 'Ƶ'
    };

    const currencyMap = {
        'a': 'ą', 'b': 'ҍ', 'c': 'ç', 'd': 'đ', 'e': 'ę', 'f': 'ƒ', 'g': 'ǥ', 'h': 'ħ', 'i': 'ɨ', 'j': 'ʝ',
        'k': 'ҟ', 'l': 'ł', 'm': 'ɱ', 'n': 'ղ', 'o': 'ø', 'p': 'ք', 'q': 'զ', 'r': 'ɾ', 's': 'ʂ', 't': 'է',
        'u': 'մ', 'v': 'ѵ', 'w': 'ա', 'x': '×', 'y': 'ყ', 'z': 'ՀՀ',
        'A': 'Ⱥ', 'B': 'Ɓ', 'C': '₵', 'D': 'Đ', 'E': 'Ɇ', 'F': 'ƒ', 'G': 'Ǥ', 'H': 'Ħ', 'I': 'Ɨ', 'J': 'J',
        'K': 'Ꝁ', 'L': 'Ⱡ', 'M': 'M', 'N': 'N', 'O': 'Ø', 'P': 'Ᵽ', 'Q': 'Q', 'R': 'Ɍ', 'S': 'S', 'T': 'Ⱦ',
        'U': 'Ʉ', 'V': 'V', 'W': 'W', 'X': 'X', 'Y': 'Ɏ', 'Z': 'Ƶ'
    };

    // 특수 스타일 처리
    if (style === 'circle') {
        return text.split('').map(char => circleMap[char] || char).join('');
    }

    if (style === 'circle-black') {
        return text.split('').map(char => circleBlackMap[char] || char).join('');
    }

    if (style === 'square') {
        return text.split('').map(char => squareMap[char] || char).join('');
    }

    if (style === 'parenthesis') {
        return text.split('').map(char => parenthesisMap[char] || char).join('');
    }

    if (style === 'upside-down') {
        return text.split('').map(char => upsideDownMap[char] || char).reverse().join('');
    }

    if (style === 'superscript') {
        return text.split('').map(char => superscriptMap[char] || char).join('');
    }

    if (style === 'subscript') {
        return text.split('').map(char => subscriptMap[char] || char).join('');
    }

    if (style === 'small-caps') {
        return text.split('').map(char => {
            if (char === char.toLowerCase()) {
                return smallCapsMap[char] || char;
            }
            return char;
        }).join('');
    }

    if (style === 'underline') {
        return text.split('').map(char => {
            if (char !== ' ') {
                return char + '\u0332'; // combining underline
            }
            return char;
        }).join('');
    }

    if (style === 'strikethrough') {
        return text.split('').map(char => {
            if (char !== ' ') {
                return char + '\u0336'; // combining strikethrough
            }
            return char;
        }).join('');
    }

    if (style === 'slash') {
        return text.split('').map(char => slashMap[char] || char).join('');
    }

    if (style === 'currency') {
        return text.split('').map(char => currencyMap[char] || char).join('');
    }

    if (style === 'fullwidth') {
        return text.split('').map(char => {
            const code = char.charCodeAt(0);
            if (code >= 33 && code <= 126) {
                return String.fromCharCode(code + 0xFEE0);
            }
            return char;
        }).join('');
    }

    const map = unicodeMap[style];
    if (!map) return text;

    return text.split('').map(char => {
        const code = char.charCodeAt(0);

        // 대문자 A-Z
        if (code >= 65 && code <= 90) {
            return String.fromCodePoint(map.offset + (code - 65));
        }
        // 소문자 a-z
        if (code >= 97 && code <= 122) {
            return String.fromCodePoint(map.offset + 26 + (code - 97));
        }
        // 숫자 0-9
        if (code >= 48 && code <= 57 && map.numbers) {
            return String.fromCodePoint(map.numbers + (code - 48));
        }

        return char;
    }).join('');
}

// 복사 버튼
copyBtn.addEventListener('click', async function() {
    try {
        const text = preview.textContent;
        await navigator.clipboard.writeText(text);

        copyBtn.textContent = '✓ 복사됨!';
        copyBtn.classList.add('copied');

        setTimeout(() => {
            copyBtn.textContent = '복사하기';
            copyBtn.classList.remove('copied');
        }, 2000);
    } catch (err) {
        console.error('복사 실패:', err);
        copyBtn.textContent = '복사 실패';
        setTimeout(() => {
            copyBtn.textContent = '복사하기';
        }, 2000);
    }
});

// 초기 첫 번째 폰트 선택
if (fontButtons.length > 0) {
    fontButtons[0].classList.add('active');
}