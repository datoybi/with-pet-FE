// infowindow 객체를 어디서 선ㅇㄴ하고
export const displayInfowindow = (infowindow, marker, title, map) => {
  const $content = `<div style="padding:5px;z-index:1;">${title}</div>`;

  infowindow.setContent($content);
  infowindow.open(map, marker);
};
