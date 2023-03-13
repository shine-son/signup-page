// 핸드폰 번호를 적는 input들 불러오기
const phoneInputs = document.querySelectorAll('.input-phone__text');

// 불러온 값들을 forEach로 돌면서 각 input에 맞는 이벤트 만들기
phoneInputs.forEach((input, index) => {
    // 1, 2번 input은 정해진 maxlength 값에 도달하면 다음 input으로 focus 넘기기
    if (index < 2) {
        input.addEventListener('input', (event) => {
            const currentInput = event.target;
            const maxLength = parseInt(currentInput.getAttribute('maxlength'));
            const currentInputValue = currentInput.value;
        
            if (currentInputValue.length === maxLength) {
                if (index < phoneInputs.length - 1) {
                phoneInputs[index + 1].focus();
                }
            }
        });
    }

    // 3번 input은 maxlength 도달 시 인증번호 확인 버튼 disabled 지우고 활성화시키기
    if (index === phoneInputs.length - 1) {
        input.addEventListener('input', (event) => {
            const currentInput = event.target;
            const maxLength = parseInt(currentInput.getAttribute('maxlength'));
            const currentInputValue = currentInput.value;
        
            if (currentInputValue.length === maxLength) {
                const phoneSendBtn = document.getElementById("phone--send__btn");

                phoneSendBtn.removeAttribute("disabled");
                phoneSendBtn.style.color = "#0068FF";
                phoneSendBtn.style.cursor = "pointer";
            }
        });
    } 
});