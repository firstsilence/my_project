var map;
var locPosition;
var arr = new Array();

// var jsonLocation = '${ctx}/resource/json/test.json';
$.getJSON('static/location.json', function (data) {
// arr = JSON.parse(data);
    $.each(data, function (I, item) {
        arr[I] = [item.eqb_nm, item.lat, item.lng, ""];

    });
});


function mapDraw() {    //지도 생성
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

            // var lat = position.coords.latitude, // 위도
            //     lon = position.coords.longitude; // 경도

            //강의실 위도,경도 (37.5605672, 126.94334859999998)
            var lat = 37.5605672,
                lon = 126.94334859999998;

            console.log("lat : " + lat);
            console.log("lon : " + lon);
            locPosition = new kakao.maps.LatLng(lat, lon); // 마커가 표시될 위치를 geolocation으로 얻어온 좌표로 생성합니다
            var message = '<div style="padding:5px;">현재 위치</div>'; // 인포윈도우에 표시될 내용입니다
            document.getElementById("curLoc").innerHTML = "현재 위치 : " + lat + " / " + lon;
            var geocoder = new kakao.maps.services.Geocoder();
            // var message = maps.InfoWindow({zIndex:1});new kakao.

            // 마커와 인포윈도우를 표시합니다
            // radiusCircle(locPosition);
            displayMarker(locPosition, message);
            // getLocation(locPosition);


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

function getLocation(locPosition) {
    if (navigator.geolocation) { // GPS를 지원하면
        navigator.geolocation.getCurrentPosition(function (position) {
            alert(position.coords.latitude + ' ' + position.coords.longitude);
            alert("here ok");
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

function enterkey() {
    if (window.event.keyCode == 13) {
        radiusCircle(locPosition);
    }
}

function radiusCircle(locPosition) {
    // 원(Circle)의 옵션으로 넣어준 반지름

    mapDraw();
    var radius = 0;
    radius = ($("#distance").val()) * 1000;
    alert("!!!" + radius);
    alert("radius locPosition : " + locPosition);
    // alert("&&&&arr val : "+arr[0][0]);
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
    for (var i = 0; i < arr.length; i++) {
        var markerTmp = new kakao.maps.Marker({
            position: new kakao.maps.LatLng(arr[i][1], arr[i][2]),
            // position: new kakao.maps.LatLng(arr[i][10], arr[i][6]),
            title: arr[i][0],
            map: map
        });
//         kakao.maps.event.addListener(map, 'click', function(mouseEvent) {
//     searchDetailAddrFromCoords(mouseEvent.latLng, function(result, status) {
//         if (status === kakao.maps.services.Status.OK) {
//             var detailAddr = !!result[0].road_address ? '<div>도로명주소 : ' + result[0].road_address.address_name + '</div>' : '';
//             detailAddr += '<div>지번 주소 : ' + result[0].address.address_name + '</div>';
//
//             var content = '<div class="bAddr">' +
//                             '<span class="title">법정동 주소정보</span>' +
//                             detailAddr +
//                         '</div>';
//
//             // 마커를 클릭한 위치에 표시합니다
//             // marker.setPosition(mouseEvent.latLng);
//             markerTmp.setMap(map);
//
//             // 인포윈도우에 클릭한 위치에 대한 법정동 상세 주소정보를 표시합니다
//             infowindow.setContent(content);
//             infowindow.open(map, marker);
//         }
//     });
// });

        var polyLineTmp = new kakao.maps.Polyline({
            map: map,
            path: [

                locPosition, new kakao.maps.LatLng(arr[i][1], arr[i][2])
                // locPosition, new kakao.maps.LatLng(arr[i][10], arr[i][6])
            ],
            strokeWeight: 2,
            strokeColor: '#FF00FF',
            strokeOpacity: 0.8,
            strokeStyle: 'dashed'
        });
        var distance = polyLineTmp.getLength(); //m단위 리턴
        // alert("distance val["+i+"]: "+distance);
        if (distance >= radius + 100 || distance <= radius - 100) {
            markerTmp.setMap(null);
            polyLineTmp.setMap(null);
            // alert("11111");
        }

    }

}





