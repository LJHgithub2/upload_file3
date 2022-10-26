function noticeAPI() {
    fetch("https://www.aedo.co.kr/v1/center/announcement",{
        method:"GET",
        headers: {
            "Accesstoken" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyYWVkMmExZGM2NjY0ZDAwZTQzMGViMyIsImlhdCI6MTY1ODQ2NTM2NCwiZXhwIjoxNjU5Njc0OTY0fQ.jmeRAZZ5BSmUC2mgrT20lSvOquCFOBc3AFikdD0ZV6g"
        },
        body: JSON.stringify({
            id: String,
            title: String,
            content: String,
            created: String
          }),
        }).then((response) => console.log(response));
}