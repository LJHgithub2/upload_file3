Kakao.init('bbbb05fb430ebf6c5ae098ff9c29018c');
  // SDK 초기화 여부를 판단합니다.
  var new_url = window.location.href
  var url_query = new URL(new_url);
  var url_params = url_query.searchParams
  var url = url_params.get('deceased_name');
  var url_decode = unescape(url);
  // var url_substring = url_decode.substring(0,3);
  // var url_split = url_substring.replace("(","");

  var parapms_url = window.location.search

  console.log(Kakao.isInitialized());

  function kakaoShare() {
    Kakao.Link.sendDefault({
      objectType: 'feed',
      content: {
        title: '故'+url_decode +'님이 별세하셨습니다.',
        description: '모바일 부고장이 도착하였습니다.',
        imageUrl: "",
        link: {
          mobileWebUrl: '카카오공유하기 시 클릭 후 이동 경로',
          webUrl: '카카오공유하기 시 클릭 후 이동 경로',
        },
      },
      buttons: [
        {
          title: '부고장 보기',
          link: {
            mobileWebUrl: 'https://www.aedo.kr/kakao/kakao_view.html?name='+url_decode,
            webUrl: 'https://www.aedo.kr/kakao/kakao_view.html?name='+url_decode
          },
        },
        {
          title: '화환 주문',
          link: {
            mobileWebUrl: 'https://www.aedo.kr/kakao/kakao_view_order.html?parapms='+parapms_url,
            webUrl:  'https://www.aedo.kr/kakao/kakao_view_order.html?parapms='+parapms_url
          },
        }
      ],
      installTalk: true,
    })
  }