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
        fontButtons.forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');
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

// 복사 버튼 클릭 이벤트 (이미지로 클립보드 복사)
copyBtn.addEventListener('click', async function() {
    try {
        copyBtn.textContent = '변환 중...';
        copyBtn.disabled = true;
        
        const canvas = await html2canvas(preview, {
            backgroundColor: '#ffffff',
            scale: 2,
            logging: false
        });
        
        canvas.toBlob(async (blob) => {
            try {
                await navigator.clipboard.write([
                    new ClipboardItem({
                        'image/png': blob
                    })
                ]);
                
                copyBtn.textContent = '✓ 복사됨!';
                copyBtn.classList.add('copied');
                
                setTimeout(() => {
                    copyBtn.textContent = '복사하기';
                    copyBtn.classList.remove('copied');
                    copyBtn.disabled = false;
                }, 2000);
                
            } catch (err) {
                console.error('클립보드 복사 실패:', err);
                
                const link = document.createElement('a');
                link.download = 'font-preview.png';
                link.href = canvas.toDataURL();
                link.click();
                
                copyBtn.textContent = '이미지 저장됨';
                setTimeout(() => {
                    copyBtn.textContent = '복사하기';
                    copyBtn.disabled = false;
                }, 2000);
            }
        });
        
    } catch (err) {
        console.error('이미지 변환 실패:', err);
        copyBtn.textContent = '복사 실패';
        setTimeout(() => {
            copyBtn.textContent = '복사하기';
            copyBtn.disabled = false;
        }, 2000);
    }
});

// 초기 첫 번째 폰트 선택
if (fontButtons.length > 0) {
    fontButtons[0].classList.add('active');
}

// 이미지 저장 버튼 (downloadBtn이 HTML에 있을 경우)
const downloadBtn = document.getElementById('downloadBtn');

if (downloadBtn) {
    downloadBtn.addEventListener('click', async function() {
        const canvas = await html2canvas(preview);
        
        const link = document.createElement('a');
        link.download = 'font-preview.png';
        link.href = canvas.toDataURL();
        link.click();
        
        downloadBtn.textContent = '✓ 저장됨!';
        setTimeout(() => {
            downloadBtn.textContent = '이미지 저장';
        }, 2000);
    });
}