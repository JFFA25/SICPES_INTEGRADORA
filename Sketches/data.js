/* Puente de datos compartido: reutiliza los datos ya definidos por app.js y pwa.js.
   No duplica contenido; solo expone una referencia única para las tres fidelidades. */
(function () {
  window.SICPES_DATA = {
    mobile: MOCK,
    pwa: PWA_MOCK,
    screens: SCREENS,
    pwaScreens: PWA_SCREENS,
    codes: SCREEN_CODES,
    student: STUDENT_SCREENS,
    admin: ADMIN_SCREENS,
    actions: SCREEN_ACTIONS,
    pwaActions: PWA_ACTIONS,
    roots: ROOT_SCREENS,
    pwaRoots: PWA_ROOTS,
    ratings: RATING_LABELS,
    pwaRatings: PWA_RATING_LABELS
  };
})();
