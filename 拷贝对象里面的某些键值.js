let data = await queryWorkType();
      // this.option2 = data
      // 循环遍历数组
      data.forEach((item, index) => {
        this.option2.push({text: '', value: ''})
        this.option2[index].text = item.dictName;
        this.option2[index].value = item.dictId;
      })