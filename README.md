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
