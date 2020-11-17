var map;
var locPosition;

function mapDraw() {    //지도 생
    var container = document.getElementById('map'); //지도를 담을 영역의 DOM 레퍼런스
    var options = { //지도를 생성할 때 필요한 기본 옵션
        center: new kakao.maps.LatLng(33.450701, 126.570667), //지도의 중심좌표.
        level: 10 //지도의 레벨(확대, 축소 정도)성
    };

    map = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴


    // HTML5의 geolocation으로 사용할 수 있는지 확인합니다
    if (navigator.geolocation) {

        // GeoLocation을 이용해서 접속 위치를 얻어옵니다
        navigator.geolocation.getCurrentPosition(function (position) {

            var lat = position.coords.latitude, // 위도
                lon = position.coords.longitude; // 경도
            console.log("lat : " + lat);
            console.log("lon : " + lon);
            locPosition = new kakao.maps.LatLng(lat, lon); // 마커가 표시될 위치를 geolocation으로 얻어온 좌표로 생성합니다
            var message = '<div style="padding:5px;">여기에 계신가요?!</div>'; // 인포윈도우에 표시될 내용입니다

            var geocoder = new kakao.maps.services.Geocoder();
            // var message = maps.InfoWindow({zIndex:1});new kakao.

            // 마커와 인포윈도우를 표시합니다
            // radiusCircle(locPosition);
            displayMarker(locPosition, message);


        });

    } else { // HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치와 인포윈도우 내용을 설정합니다

        locPosition = new kakao.maps.LatLng(33.450701, 126.570667),
            message = 'geolocation 사용 불가'

        displayMarker(locPosition, message);
    }
}

function searchAddrFromCoords(coords, callback) {
    // 좌표로 행정동 주소 정보를 요청합니다
    geocoder.coord2RegionCode(coords.getLng(), coords.getLat(), callback);
}

function searchDetailAddrFromCoords(coords, callback) {
    // 좌표로 법정동 상세 주소 정보를 요청합니다
    geocoder.coord2Address(coords.getLng(), coords.getLat(), callback);
}

// 지도에 마커와 인포윈도우를 표시하는 함수입니다
function displayMarker(locPosition, message) {
    alert("displayMarker locPosition : " + locPosition);
    // 마커를 생성합니다
    var marker = new kakao.maps.Marker({
        map: map,
        // map: new kakao.maps.Map(container, options),
        position: locPosition
    });

    var iwContent = message, // 인포윈도우에 표시할 내용
        iwRemoveable = true;

    // 인포윈도우를 생성합니다
    var infowindow = new kakao.maps.InfoWindow({
        content: iwContent,
        removable: iwRemoveable
    });

    // 인포윈도우를 마커위에 표시합니다
    infowindow.open(map, marker);

    // 지도 중심좌표를 접속위치로 변경합니다
    map.setCenter(locPosition);


}

function getLocation() {
    if (navigator.geolocation) { // GPS를 지원하면
        navigator.geolocation.getCurrentPosition(function (position) {
            alert(position.coords.latitude + ' ' + position.coords.longitude);
        }, function (error) {
            console.error(error);
        }, {
            enableHighAccuracy: false,
            maximumAge: 0,
            timeout: Infinity
        });
    } else {
        alert('GPS를 지원하지 않습니다');
    }
}

// var radius=0;
var markerTmp;      // 마커
var polyLineTmp;    // 두지점간 직선거리

var arr = new Array();
arr[0] = ["테스트1", 37.6397252, 126.671359, "대구 달서구 장기동 790"];
arr[1] = ["테스트2", 35.8502186751, 128.516473546, "대구 달서구 장기동 162-1"];
arr[2] = ["테스트3", 35.8507674215, 128.520114592, "대구 달서구 용산동 410-9"];
arr[3] = ["테스트4", 35.8491570477, 128.528283511, "대구 달서구 용산동 215-9"];
arr[4] = ["테스트5", 35.854902859257784, 128.5296955671568, "대구 달서구 용산동 955"];

function radiusCircle(locPosition) {
    // 원(Circle)의 옵션으로 넣어준 반지름

    // var radius=document.getElementById('distance').value;
    mapDraw();
    var radius = 0;
    radius = $("#distance").val();
    alert("!!!" + radius);
    alert("radius locPosition : " + locPosition);
    var circle = new kakao.maps.Circle({
        map: map,
        center: locPosition,
        radius: radius,
        strokeWeight: 2,
        strokeColor: '#FF00FF',
        strokeOpacity: 0.8,
        strokeStyle: 'dashed',
        fillColor: '#D3D5BF',
        fillOpacity: 0.5
    });
    //  markerTmp = new kakao.maps.Marker({
    //      position: new kakao.maps.LatLng(arr[i][1],arr[i][2]),
    //      title: arr[i][0],
    //      map:map
    //  });
    //
    //
    //
    //  polyLineTmp = new kakao.maps.Polyline({
    //      map: map,
    //      path: [
    //
    //          locPosition, new kakao.maps.LatLng(arr[i][1],arr[i][2])
    //      ],
    //      strokeWeight: 2,
    //      strokeColor: '#FF00FF',
    // strokeOpacity: 0.8,
    // strokeStyle: 'dashed'
    //  });


    // kakao.markers(function (m) {
    //     var c1 = map.getCenter();
    //     var c2 = m.getPosition();
    //     var poly = new Polyline({
    //         // map: map, 을 하지 않아도 거리는 구할 수 있다.
    //         path: [c1, c2]
    //     });
    //     var dist = poly.getLength(); // m 단위로 리턴
    //
    //     if (dist < radius) {
    //         m.setMap(map);
    //     } else {
    //         m.setMap(null);
    //     }
    // });
}


