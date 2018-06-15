export default function getTemplateMap(options) {
  return [
    {
      file: 'package.json',
      params: {
        PROJECT_NAME: options.projectName,
      },
    },
  ];
}
