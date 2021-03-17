// let addrs = [];
// let departments = [];
// let names = [];
// let peoples = {};
// $.getJSON("addresses.json", function (data) {
//   // console.log(data);
//   for (let i = 0; i < data.people.length; i++) {
//     addrs.push(data.people[i].address);
//     departments.push(data.people[i].department);
//     names.push(data.people[i].name);
//   }
// });

// console.log(students);
$.getJSON("addresses.json", function (data) {
  let students = data.people;
  console.log(students);
  var map = new kakao.maps.Map(document.getElementById('map'), { // 지도를 표시할 div
    center : new kakao.maps.LatLng(36.2683, 127.6358), // 지도의 중심좌표 
    level : 14 // 지도의 확대 레벨 
});
  var geocoder = new kakao.maps.services.Geocoder();

  for (let i in students) {
    // 주소로 좌표를 검색합니다
    geocoder.addressSearch(students[i].address, function (result, status) {
      // 정상적으로 검색이 완료됐으면
      if (status === kakao.maps.services.Status.OK) {
        var coords = new kakao.maps.LatLng(result[0].y, result[0].x);

        // 결과값으로 받은 위치를 마커로 표시합니다
        var marker = new kakao.maps.Marker({
          map: map,
          position: coords,
        });

        // 인포윈도우로 장소에 대한 설명을 표시합니다
        var infowindow = new kakao.maps.InfoWindow({
          content:
            '<div style="width:150px;text-align:center;padding:6px 0;">' +
            students[i].name +
            "</div>",
        });

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
        map.setCenter(coords);
      } 
      else {
        console.log("ERROR OCCUROR");
      }
    });
  }
});
