# Siply

## Project URL

[https://jen807.github.io/Siply/#/](https://jen807.github.io/Siply/#/)

## Purpose

The purpose of this app is to help users easily (simply) discover cocktail recipes and enjoy a sip of their favorite drink.

## Tech Stack

- JavaScript
- React
- Node.js
- Git
- GitHub
- CSS
- HTML

## Development Period

November 25th - November 28th (4 days)

## Features

- Recommends a "Cocktail of the Day" and allows users to search for cocktail recipes.
- Categorizes search results into cocktails matching the search term in their **names** or **ingredients**.
- Displays the list of ingredients and their measurements.

## Supported Devices

- PC
- Mobile

## Font

- Heading/Body: "116angmuburi", sans-serif

## Key Learnings During Development

### colorThief.getColor()

- `colorThief.getColor()` is a method from the Color Thief library that extracts the dominant color from a given image.
- This was used to dynamically style the main button with the background color of the recommended cocktail's image.
- This feature added a dynamic and visually appealing touch, enhancing the user experience and making the site feel more interactive.

### Paying Attention to Fonts

- While testing on mobile, I noticed that the fonts displayed as intended on PC but defaulted to Noto Sans on mobile devices.
- I resolved this by:
  1. Removing Noto Sans from the `body` font-family.
  2. Applying Noto Sans only to specific elements where necessary.
- This ensured font consistency across different devices.

---

# Siply

## 프로젝트 URL

[https://jen807.github.io/Siply/#/](https://jen807.github.io/Siply/#/)

## 목적

이 앱의 목적은 유저들이 칵테일 레시피를 찾아 간단하게(simply) 한모금(sip) 즐길 수 있게 하는 것입니다.

## 기술 스택

- JS
- React
- Node.js
- Git
- GitHub
- CSS
- HTML

## 개발 기간

11월 25일 - 11월 28일 (4일)

## 구현 기능

- 오늘의 칵테일을 추천해주고 칵테일 레시피를 검색할 수 있습니다.
- 검색시 검색어가 이름에 포함된 칵테일, 재료에 포함된 칵테일로 분류해서 볼 수 있습니다.
- 재료들과 용량을 알려줍니다.

## 지원 디바이스

- PC
- mo

## 폰트

- 헤딩/본문: "116angmuburi", sans-serif

## 프로젝트 진행 중 새로 알게 된 내용

- **colorThief.getColor()**: Color Thief 의 메서드 중 하나입니다. 이 메서드는 주어진 이미지(img)에서 가장 지배적인 색상(즉, 이미지의 대표 색상)을 추출합니다. 이를 통해 이미지의 색상 정보를 기반으로 다양한 스타일링을 동적으로 적용할 수 있습니다. 메인 화면의 버튼에 이걸 사용해서 추천 칵테일의 컬러를 추출하여 배경색으로 적용했더니 좀더 동적이고 웹사이트와 잘 어울리게 되며, 사용자에게 또 다른 재미를 줄 수 있을 것 같았습니다.

## 프로젝트 진행하면서 느낀점

- **폰트를 잘 챙기자**: 바디에 폰트를 적용하고 모바일로 확인을 했더니 pc에서는 제가 설정한 폰트로 나왔던 것들이 휴대폰에서는 notosans로 보여서 당황했었습니다. body에서 notosans를 빼고 앵무부리 폰트만 넣고 제가 지정한 부분에만 notosans폰트를 적용했더니 해결되었습니다
