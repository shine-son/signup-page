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

                // 인증번호 전송 버튼을 클릭하면
                phoneSendBtn.addEventListener("click", function (event) {
                    // 기존의 button이 가지고 있는 기능은 막고
                    event.preventDefault();

                    // 인증번호를 랜덤으로 생성해서 id가 "phone--send__span"인 태그에 값으로 넣어준다.
                    const CERTIFICATIONNUM = String(Math.floor(Math.random() * 1000000)).padStart(6, "0");
                    document.getElementById("phone--send__span").innerText = CERTIFICATIONNUM;

                    // 인증 완료 버튼이 활성화 되고
                    event.target.setAttribute("disabled", "true");
                    
                    const phoneCheckBtn = document.getElementById("phone--check__btn")
                    phoneCheckBtn.removeAttribute("disabled");

                    // 인증 완료 버튼 옆 타이머가 작동한다.
                    // 시간을 설정(3분 = 180초)
                    let timer = 180;

                    // 1초(1000ms)마다 timer가 1씩 줄고 분과 초로 나누어 값을 출력한다.
                    let intervalId = setInterval(() => {
                        if (timer > 0) {
                            timer -= 1;

                            const min = Math.floor(timer/60);
                            const second = timer%60;

                            document.getElementById("phone--check__span").innerText = min + " : " + String(second).padStart(2, "0");
                        } else {
                            document.getElementById("phone--send__span").innerText = "000000";
                            document.getElementById("phone--send__btn").setAttribute("disabled", "true");
                            phoneCheckBtn.setAttribute("disabled", "true");
                            document.getElementById("phone--check__span").innerText = "3:00";
                        }
                    }, 1000);

                    // 인증 완료 버튼 스타일 변경
                    phoneCheckBtn.style.color = "#FFFFFF";
                    phoneCheckBtn.style.backgroundColor = "#0068FF";
                    phoneCheckBtn.style.cursor = "pointer";
                })
            }
        });
    } 
});