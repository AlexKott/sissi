export function getCopyList() {
  return [
    'public/favicon.png',
    'src/index.js',
    'src/components/Page.js',
    'src/components/Section.js',
  ];
}

export function getTemplateList(options) {
  return [
    {
      file: 'package.json',
      params: {
        PROJECT_NAME: options.projectName,
      },
    },
    {
      file: 'config.json',
      params: {
        PASSWORD: options.password,
        USER_NAME: options.userName,
      },
    },
    {
      file: 'public/index.html',
      params: {
        PROJECT_NAME: options.projectName,
      },
    },
  ];
}
