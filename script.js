// 가중치 저장 변수 선언
// 실내선호 가중치
var home_count = 1;
// 이과성향 가중치
var it_count = 1;
// 외향성 가중치
var extrovert_count = 1;
// 남성성 가중치
var male_count = 1;

var radios = document.querySelectorAll('input');
for (var i = 0, max = radios.length; i < max; i++) {
  radios[i].onclick = function () {
    var next = 'q' + this.name[1];

    // // 첫번째 인덱스빼고 흐리기 동작
    // if (i != 0) {
    //     document.getElementById(
    //         "q" + String(Number(this.name[1]) - 1)
    //     ).style.opacity = "0.3";
    // }

    document.getElementById('q' + String(Number(this.name[1]) - 1)).style.opacity = '0.3';

    if (next != 'q9') {
      document.getElementById(next).scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  };
}

function result() {
  // 케이스 수만큼 반복
  for (var t = 0; t < 4; t++) {
    var case_name,
      count = 0;
    if (t == 0) case_name = 'home_';
    else if (t == 1) case_name = 'extrovert_';
    else if (t == 2) case_name = 'it_';
    else case_name = 'male_';
    // 각 가중치 버튼마다 반복 (-2 ~ +2)
    for (var i = -2; i <= 2; i++) {
      var input = case_name + String(i);
      var elements = document.getElementsByClassName(input);
      // 각 elements 하나씩 체크 확인
      for (var j = 0; j < elements.length; j++) {
        // i번째 element가 check 되어 있는지 확인하기
        if (elements[j].checked) {
          // 버튼 가중치만큼 count 증가 혹은 감소
          count += i;
        }
      }
    }
    if (t == 0) {
      if (count < 0) home_count = 0;
      else home_count = 1;
    } else if (t == 1) {
      if (count < 0) extrovert_count = 0;
      else extrovert_count = 1;
    } else if (t == 2) {
      if (count < 0) it_count = 0;
      else it_count = 1;
    } else {
      if (count < 0) male_count = 0;
      else male_count = 1;
    }
    console.log('home_count : ' + home_count);
  }
  testDataSave();
  // showResultPage();

  // // 대답안한 문항이 있는지 확인하기
  // // no라고 대답한 갯수까지 합쳐서 5이면 모든 질문에 대답했다는 의미
  // var no_counter = 0;
  // elements = document.getElementsByClassName("no");
  // for (var i = 0; i < elements.length; i++) {
  //     if (elements[i].checked) {
  //         no_counter++;
  //     }
  // }

  // // 두 카운터를 더했을때 5가 아니면 창을 띄워서 알려주고, 페이지 이동을 중지함
  // if (yes_counter + no_counter != 5) {
  //     alert(
  //         "선택안한 문제가 있습니다. 모든 문제에 답해주세요."
  //     );
  //     return;
  // }

  // // Counter에 따라 다른 결과 페이지로 이동하기
  // if (yes_counter == 5) location.href = "result_5.html";
  // else if (yes_counter == 4)
  //     location.href = "result_4.html";
  // else if (yes_counter >= 2)
  //     location.href = "result_3.html";
  // else if (yes_counter == 1)
  //     location.href = "result_2.html";
  // else location.href = "result_1.html";
}
function testDataSave() {
  sessionStorage.setItem('home_count', home_count);
  sessionStorage.setItem('it_count', it_count);
  sessionStorage.setItem('extrovert_count', extrovert_count);
  sessionStorage.setItem('male_count', male_count);
}

let ul = document.getElementById('list');
let len = 0;

function initResultPage() {
  let home = dataLoad('home_count');
  let it = dataLoad('it_count');
  let extrovert = dataLoad('extrovert_count');
  let male = dataLoad('male_count');
  let pattern = home + it + extrovert + male;
  let hobby = '';

  const hobbyList = {
    '0000': '도서관에서 책읽기',
    '0001': '미술품 감상하기',
    '0010': '멋진 사진 찍기',
    '0011': '수영하기',
    '0100': '예쁜 사진 찍기',
    '0101': '쇼핑하기',
    '0110': '자전거타기',
    '0111': '보드타기',
    1000: '뜨개질하기',
    1001: '그림그리기',
    1010: '기타치기',
    1011: '리그오브레전드',
    1100: '컴퓨터 프로그래밍',
    1101: '온라인 스터디하기',
    1110: '컴퓨터 프로그래밍',
    1111: '리그오브레전드',
  };
  hobby = hobbyList[pattern];
  setRollingData(hobby);
  moveContainer();
  sessionStorage.clear();
}

function dataLoad(key) {
  let result = '0';
  if (sessionStorage.getItem(key) > 0) {
    result = '1';
  }
  return result;
}

function setRollingData(hobby) {
  let rollingList = [
    '도서관에서 책읽기',
    '미술품 감상하기',
    '멋진 사진 찍기',
    '수영하기',
    '예쁜 사진 찍기',
    '쇼핑하기',
    '자전거타기',
    '보드타기',
    '뜨개질하기',
    '그림그리기',
    '기타치기',
    '리그오브레전드',
    '컴퓨터 프로그래밍',
    '온라인 스터디하기',
  ];
  rollingList.push(hobby);
  len = rollingList.length;
  for (let j = 0; j < 14; j++) {
    for (let i = 0; i < len; i++) {
      var li = document.createElement('li');
      li.appendChild(document.createTextNode(rollingList[i]));
      ul.appendChild(li);
    }
  }
}

function moveContainer() {
  let choosenOption = ul.children[len * 3 - 1];
  setTop(-choosenOption.offsetTop);
}

function setTop(top) {
  container.style.top = `${top}px`;
}

function showResultPage() {
  // Counter에 따라 다른 결과 페이지로 이동하기
  if (home_count > 0) {
    if (it_count > 0) {
      if (extrovert_count > 0) {
        if (male_count > 0) {
          location.href = 'result_1111.html';
        } else {
          location.href = 'result_1110.html';
        }
      } else {
        if (male_count > 0) {
          location.href = 'result_1101.html';
        } else {
          location.href = 'result_1100.html';
        }
      }
    } else {
      if (extrovert_count > 0) {
        if (male_count > 0) {
          location.href = 'result_1011.html';
        } else {
          location.href = 'result_1010.html';
        }
      } else {
        if (male_count > 0) {
          location.href = 'result_1001.html';
        } else {
          location.href = 'result_1000.html';
        }
      }
    }
  } else {
    if (it_count > 0) {
      if (extrovert_count > 0) {
        if (male_count > 0) {
          location.href = 'result_0111.html';
        } else {
          location.href = 'result_0110.html';
        }
      } else {
        if (male_count > 0) {
          location.href = 'result_0101.html';
        } else {
          location.href = 'result_0100.html';
        }
      }
    } else {
      if (extrovert_count > 0) {
        if (male_count > 0) {
          location.href = 'result_0011.html';
        } else {
          location.href = 'result_0010.html';
        }
      } else {
        if (male_count > 0) {
          location.href = 'result_0001.html';
        } else {
          location.href = 'result_0000.html';
        }
      }
    }
  }
}

function showResultPage() {
  let target =
    home_count.toString() +
    it_count.toString() +
    extrovert_count.toString() +
    male_count.toString();
  location.href = `result_${target}.html`;
}
