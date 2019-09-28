module.exports = {
  "plugins": {
    "postcss-import": {},
    "postcss-url": {},
    "autoprefixer": {},
    // ����
    /**
     * postcss-plugin-px2rem ����
     * ����ٷ��ĵ�
    */
    'postcss-plugin-px2rem': {
        // rootValue: 100, //��������� Ĭ��100  �������Ļ��Ѹ���ǩ������涨Ϊ1remΪ50px,�����Ϳ��Դ���Ƹ����������ٸ�pxֱ���ڴ�����д����px�ˡ� 
        // unitPrecision: 5, //����REM��λ��������ʮ�������֡�
        //propWhiteList: [],  //Ĭ��ֵ��һ�������飬����ζ�Ž��ð������������������ԡ�
        // propBlackList: [], //������
        exclude: /(node_module)/,  //Ĭ��false�����ԣ�reg������������ʽ�ų�ĳЩ�ļ��еķ���������/(node_module)/ ��������ǰ��UI����ڵ�pxҲת����rem����Ѵ�������ΪĬ��ֵ
        // selectorBlackList: [], //Ҫ���Բ�����Ϊpx��ѡ����
        // ignoreIdentifier: false,  //��boolean/string�����Ե������Եķ���������ignoreidentifier��replace���Զ�����Ϊtrue��
        // replace: true, // ������ֵ���滻����REM�Ĺ��򣬶�������ӻ��ˡ�
        mediaQuery: false,  //������ֵ��������ý���ѯ��ת��px��
        minPixelValue: 3 //����Ҫ�滻����С����ֵ(3px�ᱻתrem)�� Ĭ�� 0
    }

    /**
     * postcss-pxtorem ����
     * ����ٷ��ĵ�
    */
    'postcss-pxtorem': {
      rootValue: 37.5,    // ����Ļ��� Ĭ��100������ ��Ƹ���Ԫ�ؿ�375px,����ҳ��ỻ��� 10rem
      selectorBlackList  : ['weui','mu'], // ����ת������ƥ���ѡ������
      propList: ['*']
    }

    /**
     * postcss-px2rem����
     * ����ٷ��ĵ�
    */
    'postcss-px2rem': {
      remUnit: 30   // ����Ļ���
    }

  }
}