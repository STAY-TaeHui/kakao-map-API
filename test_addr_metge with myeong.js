$.loadMap = function (map, dept) {
  $.get("addresses.json", function (data) {
    //addresses.json파일을 읽어옴
    let students = data.people; //students에 people배열을 다 넣어준다.
    // console.log(students);

    if (dept != 0) {
      // dept가 0이 아니면 filtering 해줌
      students = students.filter((element) => {
        // department가 id(dept)와 같은 students만 filtering해줌
        return element.department == dept;
      });
      students.push(data.people[0]); //"비트캠프"마커는 항상 표시하도록 넣어줌
      console.log(students);
    }

    var geocoder = new kakao.maps.services.Geocoder();

    var markers = [];
    for (let i in students) {
      //students 배열 for문 돌면서 보기
      // 주소로 좌표를 검색합니다
      geocoder.addressSearch(students[i].address, function (result, status) {
        // 정상적으로 검색이 완료됐으면
        if (status === kakao.maps.services.Status.OK) {
          var coords = new kakao.maps.LatLng(result[0].y, result[0].x);

          var marker;
          if (students[i].department === 0) {
            //department가 0이면 "비트캠프" >> 마커에 이미지 입혀주기
        console.log(students[i].name);

            var imageSrc =
              "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";
            // 마커 이미지의 이미지 크기 입니다
            var imageSize = new kakao.maps.Size(24, 35);
            // 마커 이미지를 생성합니다
            var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);
            // 마커를 생성합니다
            marker = new kakao.maps.Marker({
              map: map, // 마커를 표시할 지도
              position: coords,
              image: markerImage, // 마커 이미지
            });
          } else {
            //department가 0이 아니면 조원들 >> 기본 마커
        console.log(students[i].name);

            marker = new kakao.maps.Marker({
              map: map,
              position: coords,
            });
          }
          // 결과값으로 받은 위치를 마커로 표시합니다

          // 인포윈도우로 장소에 대한 설명을 표시합니다
          var infowindow;
          if (students[i].department == 0) {
            //비트캠프 infowindow
            infowindow = new kakao.maps.InfoWindow({
              content:
                '<div style="width:150px;text-align:center;padding:6px 0;">' +
                students[i].name +
                "</div>",
            });
          } else {
            //조원들 infowindow
            infowindow = new kakao.maps.InfoWindow({
              content:
                '<div style="width:150px;text-align:center;padding:6px 0;">' +
                students[i].department +
                "조 " +
                students[i].name +
                "</div>",
            });
          }

          kakao.maps.event.addListener(marker, "mouseover", function () {
            // 마커에 마우스오버 이벤트가 발생하면 인포윈도우를 마커위에 표시합니다
            infowindow.open(map, marker);
          });
          // 마커에 마우스아웃 이벤트를 등록합니다
          kakao.maps.event.addListener(marker, "mouseout", function () {
            // 마커에 마우스아웃 이벤트가 발생하면 인포윈도우를 제거합니다
            infowindow.close();
          });

          // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
          map.setCenter(
            new kakao.maps.LatLng(37.50308235563284, 127.02419086424676)
          );
        } else {
          console.log("ERROR OCCUROR");
        }
        markers.push(marker); //배열에 marker들을 넣어줌
      });
    } //for문 끝
    console.log("Start")
    $.showMarkers(map,markers);
  });
};
$.setMarkers = (map,markers) => {
  console.log("SETMARKERS")

  for (var i in markers) {
    console.log("I : " + i);
    markers[i].setMap(map);
  }
};
$.hideMarkers = (markers) => {
  console.log("HIDE")
  $.setMarkers(null,markers);
};
$.showMarkers=(map,markers) =>{
  console.log("SHOW")

  $.hideMarkers(markers);
  $.setMarkers(map, markers);
}

$(document).ready(function () {
  // 문서 로딩 완료시 시작
  var map = new kakao.maps.Map(document.getElementById("map"), {
    //div가 map인 div에 그리기
    center: new kakao.maps.LatLng(36.2683, 127.6358), // 지도의 중심좌표
    level: 10, // 지도의 확대 레벨
  });
  console.log("READY");
  $.loadMap(map, 0); //처음 전체인원 로딩해주기

 
});
//////////////////////////////////
// 해야될것
// 1. 맵이 div에 중첩해서 계속 그려짐
// 2. 이를 맵은 하나만 그려주고
// 3. 그 안에서 마커들을 지워주고 다시 찍어주고 해야됨.
