let data = await queryWorkType();
      // this.option2 = data
      // ѭ����������
      data.forEach((item, index) => {
        this.option2.push({text: '', value: ''})
        this.option2[index].text = item.dictName;
        this.option2[index].value = item.dictId;
      })