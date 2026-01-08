// 요소 가져오기
const textInput = document.getElementById('textInput');
const preview = document.getElementById('preview');
const fontButtons = document.querySelectorAll('.font-btn');
const fontSizeSlider = document.getElementById('fontSize');
const sizeValue = document.getElementById('sizeValue');
const copyBtn = document.getElementById('copyBtn');

// 현재 선택된 폰트 저장
let currentFont = 'Noto Sans KR';

// 텍스트 입력 이벤트
textInput.addEventListener('input', function() {
    preview.textContent = this.value || '여기에 미리보기가 표시됩니다.';
});

// 폰트 버튼 클릭 이벤트
fontButtons.forEach(button => {
    button.addEventListener('click', function() {
        // 모든 버튼에서 active 클래스 제거
        fontButtons.forEach(btn => btn.classList.remove('active'));

        // 클릭된 버튼에 active 클래스 추가
        this.classList.add('active');

        // 폰트 적용
        currentFont = this.getAttribute('data-font');
        preview.style.fontFamily = `'${currentFont}', sans-serif`;
    });
});

// 글자 크기 조절 이벤트
fontSizeSlider.addEventListener('input', function() {
    const size = this.value;
    sizeValue.textContent = size;
    preview.style.fontSize = size + 'px';
});

// 초기 첫 번째 폰트 선택
if (fontButtons.length > 0) {
    fontButtons[0].classList.add('active');
}


// 복사 버튼 클릭 이벤트 (맨 아래에 추가)
copyBtn.addEventListener('click', function() {
    const text = preview.textContent;
    
    navigator.clipboard.writeText(text).then(() => {
        // 복사 성공
        copyBtn.textContent = '✓ 복사됨!';
        copyBtn.classList.add('copied');
        
        setTimeout(() => {
            copyBtn.textContent = '복사하기';
            copyBtn.classList.remove('copied');
        }, 2000);
    }).catch(err => {
        // 복사 실패 (구형 브라우저 대응)
        const textarea = document.createElement('textarea');
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        
        copyBtn.textContent = '✓ 복사됨!';
        setTimeout(() => {
            copyBtn.textContent = '복사하기';
        }, 2000);
    });
});