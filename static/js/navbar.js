$(function () {
  // 회원가입, 로그인 창 닫기
  $(".btncl").click(function (e) {
    // 회원가입, 로그인 창 닫을 시 현재 화면으로 새로고침
    location.reload();
  });

  // 회원가입 진행
  $(".btn-signup").click(function (e) {
    // btn-signup 클래스 부분을 클릭 시, 링크 이동 등 어떠한 행위도 동작하지 않도록 해주는 함수 -> ajax 작동 위해 필요한 선행 작업
    e.preventDefault();
    // btn-signup 클래스에서 'href' 속성 값을 가져와 url 변수에 저장
    var url = $(this).attr("href");
    // user-signup 아이디(여기선 회원가입 form 태그) 부분의 html 태그를 form 변수에 저장
    var form = $("#user-signup")[0];
    // form 태그 안에 있는 모든 input으로 입력한 value값을 'name'을 key로 하여, formData 변수에 저장
    // --> ex. <input type="text" placeholder="이메일 주소 입력" class="form-control" id="login-user-email" name="email"> 에서 유저가 positipman@gmail.com을 입력했다면, formData에서 key는 email, value는 positipman@gmail.com 이 된다.
    var formData = new FormData(form);
    var realName = $("#name").val();
    $.ajax({
      url: url,
      // form에 file type 이 있는 경우 enctype: 'multipart/form-data'를 설정해야 한다.
      enctype: "multipart/form-data",
      // formData를 이용하기 위해서 아래 processData, contentType을 반드시 false로 설정해줘야 한다.
      processData: false,
      contentType: false,
      // ajax 통신 중, cache가 남아서 갱신 데이터를 받아오지 못하는 경우 사용한다.
      cache: false,
      type: "post",
      // data로는 formData를 request로 보낸다.
      data: formData,
    }).done(function (data) {
      // request 보낸 url에서 회원가입 정상 진행해도 무방하여 {'works':True}를 JsonResponse로 보낸 경우
      if (data.works) {
        alert(
          "환영합니다 " +
            realName +
            "님\n" +
            "회원가입이 성공적으로 완료되었습니다."
        );
        location.reload();
        // request 보낸 url에서 사용자 이메일 주소가 없다고 {'noEmail':True}를 JsonResponse로 보낸 경우
      } else if (data.noEmail) {
        alert("이메일 주소를 입력해주세요.");
        // request 보낸 url에서 사용자 이름이 없다고 {'noRealName':True}를 JsonResponse로 보낸 경우
      } else if (data.noRealName) {
        alert("이름을 입력해주세요.");
        // request 보낸 url에서 사용자 패스워드가 없다고 {'noPassword':True}를 JsonResponse로 보낸 경우
      } else if (data.noPassword) {
        alert("비밀번호를 입력해주세요.");
        // request 보낸 url에서 사용자 2차 패스워드가 없다고 {'noPassword2':True}를 JsonResponse로 보낸 경우
      } else if (data.noPassword2) {
        alert("비밀번호를 확인해주세요.");
        // request 보낸 url에서 사용자가 잘못된 이메일 형식을 입력했다고 {'wrongEmail':True}를 JsonResponse로 보낸 경우
      } else if (data.wrongEmail) {
        alert("올바른 이메일 주소 형식이 아닙니다.");
        // request 보낸 url에서 사용자가 입력한 이메일이 이미 존재한다고 {'emailExists':True}를 JsonResponse로 보낸 경우
      } else if (data.emailExists) {
        alert("입력하신 이메일이 이미 등록되어있습니다.");
        // request 보낸 url에서 사용자 이름에 영문자, 숫자, 특수문자가 포함되어 {'wrongName':True}를 JsonResponse로 보낸 경우
      } else if (data.wrongName) {
        alert("이름엔 숫자, 특수문자가 허용되지 않습니다.");
        // request 보낸 url에서 사용자가 입력한 이름이 허용길이를 초과한다고 {'tooLongName':True}를 JsonResponse로 보낸 경우
      } else if (data.tooLongName) {
        alert("입력하신 이름은 허용 길이를 초과합니다.");
        // request 보낸 url에서 사용자가 입력한 비밀번호가 허용길이를 만족하지 못한다고 {'tooShortPwd':True}를 JsonResponse로 보낸 경우
      } else if (data.tooShortPwd) {
        alert("비밀번호는 최소 8자리 이상이어야 합니다.");
        // request 보낸 url에서 사용자가 입력한 비밀번호가 잘못된 형식이라고 {'wrongCombination':True}를 JsonResponse로 보낸 경우
      } else if (data.wrongCombination) {
        alert(
          "비밀번호는 최소 영어 소문자/대문자, 숫자, 특수문자 중,\n 2개 이상 조합으로 구성되어야 합니다."
        );
        // request 보낸 url에서 사용자가 입력한 2차 비밀번호가 1차 비밀번호와 다르다고 {'notMatch':True}를 JsonResponse로 보낸 경우
      } else if (data.notMatch) {
        alert("재입력한 비밀번호가 이전 비밀번호와 일치하지 않습니다.");
        // 그 밖 모든 data를 JsonResponse로 보낸 경우
      } else {
        alert("정상 요청이 아닙니다.");
      }
    });
  });

  // 로그인 진행
  $(".btn-login").click(function (e) {
    e.preventDefault();
    var url = $(this).attr("href");
    var form = $("#user-login")[0];
    var formData = new FormData(form);

    $.ajax({
      url: url,
      enctype: "multipart/form-data",
      processData: false,
      contentType: false,
      cache: false,
      method: "POST",
      data: formData,
    }).done(function (data) {
      if (data.works) {
        alert("로그인되었습니다.");
        location.reload();
      } else if (data.wrongInformation) {
        alert("입력된 정보와 일치하는 회원 정보가 없습니다.");
        $("#login-user-email").val("");
        $("#login-user-password").val("");
      } else if (data.noEmail) {
        alert("이메일 주소를 입력해주세요.");
        $("#login-user-password").val("");
      } else if (data.noPassword) {
        alert("비밀번호를 입력해주세요.");
      } else {
        alert("정상 요청이 아닙니다.");
      }
    });
  });

  // // 로그아웃 진행
  // document.querySelector(".user-logout").addEventListener("click", (e) => {
  //   e.preventDefault();
  //   if (confirm("로그아웃 하시겠습니까?")) {
  //     location.href = e.target.href;
  //   } else {
  //     location.reload();
  //   }
  // });
  $(".user-logout").click(function (e) {
    e.preventDefault();
    if (confirm("로그아웃 하시겠습니까?")) {
      location.href = e.target.href;
    } else {
      location.reload();
    }
  });
});
