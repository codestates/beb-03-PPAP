# beb-03-project3-PPAP

### Project Notion Page
https://deeply-mountain-e1f.notion.site/d55f3699bc8b422a9bd5c48a6eb519b2


### 
![slogan](https://user-images.githubusercontent.com/45090300/175894526-be7ebe73-50db-4f29-b9f8-2e9a4ae19b5a.png)


### Codestates Blockchain Engineering Bootcamp Final Project

### - PassPort for All People -

---

# Inspiration

### Passport

여권은 해외 여행을 하는 자국민의 안전을 위해, 국가가 해당 자국민에 대해 발급하는 공식적인 신분 증명서입니다. 하지만 현재의 여권은 여러가지 문제점을 지니고 있습니다.

- 파손 위험성
    
    국제민간항공기구(ICAO)의 인증을 통과한 여권이지만, 현재 여권의 본질은 ‘종이’ 형태의 증명서입니다. 종이의 특성 상 필연적으로 파손, 훼손에 취약할 수 밖에 없습니다. 파손, 훼손된 여권을 사용하는 경우 출입국이 되지 않을 뿐더러 최악의 경우 여권 위조죄로 형사적 처벌을 받을 수도 있습니다.
    
- 분실 및 여권 범죄 위험성
    
    여행 중에 개인 신분을 증명할 수 있는 수단이므로 여권은 언제든 제출할 수 있도록 항상 지니고 있어야합니다. 이 과정에서 분실의 확률이 높아질 수 있습니다. 그리고 대한민국 여권으로 세계 많은 나라들에 입국할 수 있으므로 외국에서는 대한민국 여권이 위조나 도난 등의 범죄 표적이 되기도 합니다.

    - 2019년 Henley 여권 지수 기준 190여개국 여행 가능
    - COVID-19 Protocol 이후 여권 Power Rank 2위를 기록

### Electric Passport

현재 ‘전자여권’이라는 명칭으로 외교부에서 발행하는 여권은 완전한 종이형 여권에 전자적으로 읽을 수 있는 칩이 내장되어 있는 형태입니다. 하지만 이 전자여권 역시 내장된 칩이 손상된다면 제 기능을 하지 못하므로 취급에 주의를 요하고 있습니다.

---

# Passport with DID

### SSI & DID

2015년 인터파크의 개인정보 유출사태나 2016년 Cambridge Analytica의 페이스북 데이터 불법 수집, 2019년 페이스북 이용자 개인정보 유출사건 등으로 인해 개별 서비스 제공자나 대형 플랫폼의 DB 관리 문제가 수차례 제기 되었습니다. 이는 중앙화된 DB로 인해 생기는 단일 장애점(Single Point of Failure, SPF) 문제로 촉발된 것입니다. 

- SSI
    
    일련의 데이터 누출 사건 이후로 개인을 증명할 수 있는 정보(ID)를 서비스 제공자나 대형 플랫폼 등의 제3자에게 맡기는 것이 아니라, 개인 스스로가 정보 주권을 가지는 자기주권신원(Self-Sovereign Identity, 이하 SSI)의 논의가 활발해졌습니다.
    
- DID
    
    ![https://ssimeetupkorea.github.io/vc-data-model/diagrams/ecosystem.svg](https://ssimeetupkorea.github.io/vc-data-model/diagrams/ecosystem.svg)
    
    각 개인(Holder)은 분산 ID(Decentralized Identifier, 이하 DID)에 의해 식별될 수 있습니다. 문자 그대로 DID가 식별자의 역할을 하는 것입니다. 발행자(Issuer) 또한 발행자의 DID에 의해 식별될 수 있습니다. 블록체인 기술이 탄생한 이후로는 체인 위에 발급 기록을 투명히 기록하되, 개인 정보 자체는 SSI 개념을 도입하여 본인이 관리하는 방식으로 DID 기술이 발달했습니다. 어떤 검증자(Verifier)에게 신원 정보 제출 필요시에는 DID와 VC(Verifiable Credential), VP(Verifiable Presentation)로 공개 대상과 범위를 본인이 지정하여 제출할 수 있습니다.
    
    국내에서도 이러한 DID를 이용한 서비스가 속속 등장했습니다.
    
    - 부산광역시 시민들을 상대로 하는 모바일 신분확인 서비스 B Pass

    - COVID-19 백신 접종 인증 시스템 COOV - 여권 연동 가능

---

# A**pp implementation**

여전히 해결되지 못한 문제점들을 해결하기 위해서 종이형이 아닌 완전한 전자적 형태의 여권의 필요성을 인식하였고, 저희 팀은 COVID-19 백신 접종 인증 시스템인 COOV의 모델을 참고하여 스마트폰에서 사용할 수 있는 형태의 전자여권을 고안했습니다.

---

# F**ull configuration**

![그림1](https://user-images.githubusercontent.com/45090300/175895131-d7e21c78-b183-4536-8dfe-c3559080654b.png)

외교부에게 여권, 비자를 발급받고, 출입국 심사 시 발급받은 여권과 비자를 검증하여 출입국 도장을 발급받는 전체 과정을 나타낸 그림입니다.

여권 발급

1. 외교부는 DID를 생성하여 체인에 정보를 저장합니다.
2. 사용자는 자신의 DID를 생성하여 체인에 정보를 저장합니다.
3. 사용자는 외교부에게 DID와 Claim을 보내 여권을 신청합니다.
4. 외교부는 신청정보를 확인하고 체인에 여권 VC 발급 정보를 저장합니다.
5. 외교부는 사용자에게 발급한 여권 VC를 돌려줍니다. 

비자발급

1. 사용자는 외교부에게 DID와 Claim을 보내 비자를 신청합니다.
2. 외교부는 신청정보를 확인하고 체인에 비자 VC 발급 정보를 저장합니다.
3. 외교부는 사용자에게 발급한 비자 VC를 돌려줍니다.

출입국 검증

1. 사용자는 자신이 보유하고 있는 여권과 비자 VC로 VP를 만들어 출입국 심사에 제출합니다.
2. 출입국 심사는 해당내용을 검증합니다.
3. 검증이 성공하면 출입국 심사는 입출국에 대한 도장을 NFT로 발행하고, 사용자 주소로 돌려줍니다.

---

# Details

### Holder Authorization scenario

<img width="1363" alt="스크린샷 2022-05-25 오후 2 46 41" src="https://user-images.githubusercontent.com/45090300/175895287-b6b7e289-6167-4b07-b6c5-a485163bc161.png">

여권을 VC의 형태로 발급받아 사용하기 위해서는 회원 가입 및 본인 인증 과정이 필요합니다. 

- **Register user data**
    
    사용자(홀더)는 PPAP 앱에 회원가입을 진행합니다.
    
- **Store user data**
    
    DB에 사용자 정보를 저장합니다. 이 때 홀더가 발급한 DID 또한 DB에 저장됩니다.
    
- **Login with user data**
    
    사용자(홀더)가 로그인을 진행합니다.
    
- **Verify user data**
    
    입력받은 사용자 정보가 서버 DB에 존재하는 유효한 회원인지 검증합니다.
    
- **Approved & Return Access token**
    
     검증이 완료되면 사용자에게 Access token을 발급해줍니다.
    

### Issuing Passport scenario

<img width="1238" alt="스크린샷 2022-05-25 오후 2 47 45" src="https://user-images.githubusercontent.com/45090300/175895449-12a6b918-7830-42ac-8bbe-c5daad781fa1.png">


회원 가입 및 로그인이 완료된 사용자(홀더)는 본격적으로 여권을 VC의 형태로 발급받아 사용할 수 있습니다.

- **Request passport VC(claim)**
    
    사용자(홀더)는 발급 서버(Issuer)에게 여권 발급을 요청합니다.
    
- **Verify holder**
    
    발급 서버(Issuer)는 여권 발급을 요청한 사용자(홀더)가 유효한 사용자인지, 발급 서버와 동일한 국적의 사람인지 확인합니다.
    
- **Contain user data in VC & Return passport VC**
    
    사용자 검증이 완료되면, 사용자가 보내준 Claim을 VC의 형태로 발급해줍니다. 발급받은 VC는 JWT token 형태로, 아래와 같이 구성되어 있습니다.
    
    ```json
   
    "credentialSubject": {
    	"passportInfo": {
    		"did": "did:ethr:ganache:0x020fe6aecec69932c15a053ee506b42c97aaab88d5b803db02a5298555310b0b27",
    		"country_code": "KOR",
    		"user_name" : "HONG GILDONG",
    		"age" : "20",
    		"sex" : "M",
    }
    }
    ```
    

### Issuing Visa Scenario (e.g., USA → Korea)

<img width="1273" alt="스크린샷 2022-05-25 오후 1 39 21" src="https://user-images.githubusercontent.com/45090300/175895572-14e9c9fc-a6e0-4cef-853c-4d5da91e1cbd.png">


여권 발급이 완료된 사용자는 이어서 원하는 비자를 VC형태로 발급받을 수 있습니다. 예를 들어, 미국 국적의 사용자(홀더)가 한국 비자를 발급받는 상황을 가정하겠습니다.

- **Make VP using passport VC**
    
    사용자는 발급받은 미국 국적의 여권 VC를 본인의 기기에 저장해 두었다가, 비자를 받고 싶을 때 본인의 개인키로 서명하여 VP형태로 만듭니다.
    
- **Request visa VC(claim)**
    
    사용자는 비자 VC를 발급받기 위해 한국의 검증 서버로 claim을 전송합니다. 이 때 요청에 담기는 데이터는 아래 두가지입니다.
    
    - Passport as VP : VP형태로 만든 사용자의 여권을 의미합니다.
    - Visa request data : 신청하고자 하는 비자의 정보를 의미합니다. (비자 목적, 체류기간, 대상 국가 등이 포함), 이 때 사용자는 본인 국가의 비자는 발급받을 수 없습니다. (i.e., 미국인이 미국 비자 발급 불가능)
- **Decrypt VP and verify**
    
    검증 서버는 전송받은 여권 VP가 사용자(홀더)의 개인키로 서명되었는지 검증합니다. 그런 후에 그 안에 들어 있는 여권 VC 또한 미국의 여권 발급 서버의 개인키로 서명되었는지 검증합니다.
    
- **Validation success & Send purpose data**
    
    여권 검증이 끝나면 발급 서버는 비자 VC 발급을 요청받습니다.
    
- **Approve request & Return visa VC**
    
    발급 서버는 사용자가 요청한 비자를 개인키로 서명하여 VC형태로 전송해줍니다. 
    

### Issuing Immigration Stamp Scenario

<img width="1280" alt="스크린샷 2022-05-25 오후 1 39 56" src="https://user-images.githubusercontent.com/45090300/175895695-85abb799-5568-4c1e-81a5-c81568fdd2c7.png">


여권과 비자를 모두 발급받았다면, 이제 사용자는 출입국 수속을 밟을 수 있습니다. 발급받은 여권과 비자는 모두 JWT token 형태로 사용자의 기기에 저장되어있기 때문에, 이것을 토대로 출입국 수속을 요청하고, 출입국 도장을 NFT 형태로 발급받을 수 있습니다.

- **Make VP using passport VC and visa VC**
    
    사용자는 출입국 수속을 밟기 위해 가지고 있는 여권, 비자 VC를 모두 본인의 개인키로 서명하여 VP형태로 만듭니다.
    
- **Request immigration stamp**
    - 사용자는 검증 서버(한국)에 VP를 제출합니다. 한국의 검증 서버는 이 사용자의 VP를 홀더의 공개키로 복호화하여 비자 VC와 여권 VC를 얻습니다.
    - 한국의 검증 서버는 사용자의 여권이 미국의 발급 서버에서 발급된 것인지 검증합니다.
    - 한국의 검증 서버는 비자 VC가 한국에서 발급된것인지 검증합니다.
- **Validation success**
    
    검증이 성공하면 서버에서는 출입국 도장을 NFT로 발급해주기 위해 메타 데이터를 만듭니다. 이 때 메타 데이터에는 발급 국가의 고유 이미지와 출입국 정보가 포함됩니다.
    
- **Request minting stamp NFT to holder & Mint NFT**
    
    서버는 출입국 도장을 NFT형태로 만들어서 홀더의 지갑 주소로 민팅합니다. 이제 사용자는 언제든지 해당 컨트랙트에서 본인이 발급받은 NFT를 여권 앱에서 찾아볼 수 있습니다.
   
# Front Details

### 여권 발급 과정

https://youtu.be/L5bO4sRFuCU

### 비자 발급 과정

https://youtu.be/ATvQw8Ycvf4

### 출입국 심사 과정

https://youtu.be/Pg046s5UWMg

---

# **Advantages**

- 여권의 분실 내구성
    
    여권을 분실하였을 경우 소지자는 별도의 수수료를 지불해야하며, 상습 분실자는 관련법에 따라 블랙 리스트에 오를 수 있습니다. 국민 대다수가 사용하는 핸드폰, 특히 스마트폰(스마트폰 보급률 95% 도달 - 2021 갤럽)은 상시 소지하는, 개인이 보관에 더 주의를 가하는 물품입니다. 단순히 분실에 유의하여야만 하는 일반 여권과 달리, 앱 여권은 분실 문제에 조금은 더 근본적인 대책이 될 수 있을 것입니다.
    
- 여권의 훼손, 파손 내구성
    
    사용자는 스마트폰 앱으로 여권을 사용하는, 완전히 전자적인 형태이므로 여권 자체의 파손이나 훼손으로부터 안전합니다.
    
- 사용 편의성
    
    스마트폰의 앱을 실행하여 필요에 따라 여권이나 비자를 제시할 수 있습니다. 단순히 종이여권을 제출해서 개인 인증을 하는 것 만큼의 편의성을 제공할 수 있습니다.     
    
- 개인화된 인증
    
    현재 스마트폰은 다양한 방식의 개인 인증(간편비밀번호, TouchID, FaceID와 같은 생체인증 등)을 제공하고 있습니다. 설사 전자여권을 지니고 있는 스마트폰을 분실하더라도, 개인화된 인증을 통해야 하므로 핸드폰 실소유자만 정보에 접근할 수 있습니다.
    
- 표준화된 문서 양식
    
    W3C는 체인 의존성이 없는, 즉 어떠한 블록체인이라도 동작할 수 있도록 DID에 대한 표준을 제시했습니다. 따라서 체인의 종류와 상관 없이 호환 가능한 어플리케이션으로 확장할 수 있는 가능성이 있습니다.
    

---

# Require Stack

<img width="1490" alt="Untitled (1)" src="https://user-images.githubusercontent.com/45090300/175896447-ac615f85-7ad3-4300-a031-8e8bba4f8b11.png">


---

# TBD

### Using NFT Stamp as Sightseeing benefit

사용자의 입국시 발행하는 출입국 도장은 현재 NFT의 형태로 발행하고 있습니다. 전자여권 활성화를 위해 해당 NFT를 보유하는 사용자에 대해서는 할인 베네핏을 적용하는 등의 관광 수단으로 사용할 수 있을 것입니다.

### User authorization with OAuth 2.0

현재 개인 인증 과정은 개인 정보가 등록된 인증서버로부터 개인의 유효성을 검증받는 형태입니다. 차후 구글이나 네이버, 카카오 등의 플랫폼으로부터 OAuth 2.0 인증을 통해 개인정보를 가져올 수 있다면 UX 측면에서 더 편리할 뿐만 아니라 DB 사용을 줄여 탈중앙화에 한 걸음 더 가까워질 수 있을 것입니다.

---

# Presentation

[PPAP 포폴용.pdf](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/e16f5a47-efff-41ae-93d7-222990428a5a/PPAP_포폴용.pdf)

---

# Our Team

---

### git commit Comment rule
**Comment Rule**
- 어떻게 보다는 무엇과 왜를 설명한다
- 전체 영어로 작성
- 제목 첫 글자는 대문자로 작성
- 제목 끝에 마침표 넣지 않기
- 제목을 50글자 내로 제한
- 본문의 각 행은 72글자 내로 제한

**Comment Structure**
``` shell
# 헤더
<type>(<name>): <subject>
<BLANK LINE>
# 본문 => 옵션
<body>                         
```
type 
- feat : 새로운 기능에 대한 커밋
- bug : 버그 수정에 대한 커밋
- build : 빌드 관련 파일 수정에 대한 커밋
- chore : 그 외 자잘한 수정에 대한 커밋
- docs : 문서 수정에 대한 커밋(ReadMe)
- style : 코드 스타일 혹은 포맷 등에 관한 커밋
- test : 테스트 코드 수정에 대한 커밋
