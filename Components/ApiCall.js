import { Component } from 'react';
import axios from 'axios';
import { Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
class ApiCall extends Component {

    constructor(props) {
        super(props)
        this.state = {
            i:[],
            help:"",
            alldata:[],
            categories: [],
            traystyle:[],
            item:[],
            cart_product:[],
            my_orders:[],
            wish_list:[],
            notifications:[],
        }
    }
    
    componentDidMount() {
        this.getdata();
        
    }
    
      async getdata() 
      {
        try {
            let user = await AsyncStorage.getItem('user');
            let parsed = JSON.parse(user);
            this.setState({ data: parsed }) 
          }
          catch (error) {
            Alert.alert(error)
          }
        let resp = await axios.get('https://echoit.in/craftslane-apis/homepage.php')
        let resp2 = await axios.get('https://echoit.in/craftslane-apis/categories.php')
        let resp3 = await axios.get('https://echoit.in/craftslane-apis/productprofile.php')
        // let resp4 = await axios.get('https://staging.shivikaspottery.com/index.php?route=api/customhome/index&key=U9XLFvnjCiOTIf3JIhPntVuhhAwpjczjuVvTpbs3cxNzUOq7ph9XCt3OfxuiUvCpFiNB8EHsvrfcfZ8uESKeJNazqaDosjVXz7DmJvksWp8yBIJMGFHX3agUTVByMS3IURBcYLMUyf8bNnIm4Xtu5vOKyPgVTDWXiS13IfdP4E3bMt79GXT1lnFXvYqkfvcv1PbGLlIJ6K4otiJ8O5rE7mW7KixetI2MHUHctmlpK6uCCLMIphE0mBndSWroyWEX')
        let resp5 = await axios.get('https://echoit.in/craftslane-apis/cart_product.php')
        let resp6 = await axios.get('https://demo.craftslane.com/index.php?route=api/customorderlist/index&key=Afp7hVxPE5PBTWTcr3vvS7kmyEhSxLg2sDARRTrb7R5ZSOuOQxvYqXk7acN6KElEJ3X0BERWRl0MFqa5NlTtoPC7VLLZIzciuXBaoZJtFWXVhXS3GluDUzvFf4TaLP0jyhcIvnArvaKr341HgX4Aubjbm1IDUJzlfBBb03ohbl3zGEvwdNiqUuS8oFTgCaMQhhoFNr2AkRtR0nkA43xkg2YcKHZxmHAejSic4E0fh7nvBIn2hppUGw7jowfX1l2q&os_type=android&token=jP6w3Bh3W9fUf4hVQdNT8H0I5BGjWv0M')
        let resp7 = await axios.get('https://echoit.in/craftslane-apis/wish_list.php')
        let resp8 = await axios.get('https://echoit.in/craftslane-apis/notifications.php')
        let resp9 = await axios.get('https://echoit.in/craftslane-apis/help.php')
        let r = await axios.get('https://demo.craftslane.com/index.php?username=uf5ini8twtgcc&db=dbzddlcurjfo3f&route=api/categoryproducts/index&cat_id=10&key=Afp7hVxPE5PBTWTcr3vvS7kmyEhSxLg2sDARRTrb7R5ZSOuOQxvYqXk7acN6KElEJ3X0BERWRl0MFqa5NlTtoPC7VLLZIzciuXBaoZJtFWXVhXS3GluDUzvFf4TaLP0jyhcIvnArvaKr341HgX4Aubjbm1IDUJzlfBBb03ohbl3zGEvwdNiqUuS8oFTgCaMQhhoFNr2AkRtR0nkA43xkg2YcKHZxmHAejSic4E0fh7nvBIn2hppUGw7jowfX1l2q');
        
        this.setState({item:r.data})
        // this.setState({i:r.data})
        this.setState({help:resp9.data.data})
        this.setState({notifications:resp8.data.data})
        this.setState({my_orders:resp6.data.data})
        this.setState({categories:resp2.data.data})
        this.setState({cart_product:resp5.data.data})
        this.setState({wish_list:resp7.data.data})

        // this.setState({item:resp3.data.data.occasion})
        this.setState({traystyle:resp3.data.data})
        this.setState({ alldata: resp.data.data })
        // console.warn(resp6.data.data);
      }
}

export default ApiCall;
