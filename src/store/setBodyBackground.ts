export const setBodyBackground = (bgClass: "bg-default" | "bg-admin") => {
  document.body.className = "";
  document.body.classList.add(bgClass);
};
