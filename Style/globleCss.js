import { StyleSheet } from "react-native";
import { Dimensions } from "react-native";
import { get } from "react-native/Libraries/Utilities/PixelRatio";
import { HomeAccent } from "../export";
import DeviceInfo from 'react-native-device-info';
import Variables from "../Components/Variables";




export const portraitStyles = StyleSheet.create({
  //---------------------------------------------Intro_slider-------------------------------------------------------------------
  IntroSliderContainer: {
    height: Dimensions.get("screen").height,
    width: Dimensions.get("screen").width,
    justifyContent: 'center',
    alignItems: 'center',
  },
  IntroSliderText: {
    color: 'white',
    // fontFamily: 'r',
    textAlign: "center",
    textAlignVertical: "center",
    fontSize: 30,
    width: 210,
    marginTop: -80,
    backgroundColor: 'rgba(0, 0, 0, 0.18)',
    padding: 10,
    borderRadius: 10,
  },
  screenBackground: {
    height: Dimensions.get("screen").height,
    width: Dimensions.get("screen").width,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'#f9f0df',
    // backgroundColor:'green',
    
  },
  screenBackgroundTab: {
    height: Dimensions.get("screen").height,
    width: Dimensions.get("screen").width,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'#f9f0df',
    // backgroundColor:'green',
    // paddingBottom:'20%',
  },
  screenBackgroundStackTab: {
    height: '100%',
    width: Dimensions.get("screen").width,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'#f9f0df',
    // backgroundColor:'green', 
    // paddingBottom:'33%',
  },
  splashLogo: {
    width: 300,
    height: 200,
  },
  container: {
    height: Dimensions.get("screen").height,
    width: Dimensions.get("screen").width,
    // backgroundColor:'#f2ebd5',
    // backgroundColor:'#f2ebd5',
    // backgroundColor:'skyblue',
    padding:2,
    paddingBottom:80,
  },
  selectDropdownContainer:{
    backgroundColor:'#f2ebd5',
    width:'100%',
    justifyContent:'center',
    alignItems:'center',
    marginVertical:20,
   
  },
  selectDropdown:{
    backgroundColor:'#f2ebd5',
    borderRadius:15,
    borderWidth:1,
    borderColor:'grey',
    width:'80%'
  },
  logoContainer: {
    width: '100%',
    justifyContent:'center',
    alignItems:'center',
    padding:20,
  },
  logo: {
    width: 165,
    height: 110,
    // backgroundColor: '#f2ebd5',
  },

  bgColor: {
    // marginTop:10,
    backgroundColor: '#f2ebd5',
    // backgroundColor:'red',
    height: '100%',
    // marginBottom:65,
  },

  bgColorForStackNavigation: {
    // marginTop:10,
    backgroundColor: '#f2ebd5',
    // backgroundColor:'skyblue',
    height: '100%',
    marginBottom:130,
  },
  containLabelAndInput: {
    marginTop: 5,
    // height: 60,
    // backgroundColor: 'skyblue',
    justifyContent: 'center',
    alignItems: 'center'
  },
  
  label: {
    color: '#3d3d3d',
    marginLeft: 15,
  },
  input: {
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
    width: '90%',
    // left: 15,
    height:60,
    color:'black',
    // backgroundColor: 'green'
  },
  passwordInput: {
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
    width: '90%',
    height: 60,
    // left: 15,
    // top: 2,
    color:'black',
  },
  passwordEyeIcon:{
    // backgroundColor:'red',
    position: 'absolute', 
    left: DeviceInfo.isTablet() ? Dimensions.get('screen').width / 1.2 : Dimensions.get('screen').width / 1.3 
  },
  termsAndConditionContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent:'center',
    alignItems:'center',
    // height: 140,
    padding: 15,
    width:'100%',
    // backgroundColor:'red'
  },
  termsAndCondition: {
    display: 'flex',
    flexDirection: 'row',
    width: '90%',
    // marginLeft: 30,
    marginTop: 10,
    //  backgroundColor:'green'
  },
  terms: {
    padding: 10,
    color: '#3d3d3d',
    alignItems: 'center',
    width: '90%',
    //backgroundColor:'black'
  },
  checkbox: {
    // top: -5,
    // paddingLeft:5
  },
  checkboxContainer:{
    justifyContent: 'center',
    alignItems:'center',
    // backgroundColor: 'skyblue'
  },
  buttonContainer: {
    justifyContent: 'space-around',
    alignItems: 'center',
    margin: 10,
    padding: 10,
    // marginBottom:80,
    // backgroundColor:'lightgreen'
    

  },
  logoutButtonContainer: {
    // justifyContent: 'space-around',
    alignItems: 'center',
    width:'100%',
    marginTop:20,
    
    padding: 10,
    marginBottom:200,
    // backgroundColor:'green'
  },
  creatButtonContainer: {
    // justifyContent: 'space-around',
    alignItems: 'center',
    width:'100%',
    // marginTop:20,
    
    padding: 10,
    marginBottom:200,
    // backgroundColor:'green'
  },
  button: {
    backgroundColor: '#B48D56',
    width: "100%",
    justifyContent: 'center',
    // display:'flex',
    // flexDirection:'row',
    alignItems: 'center',
    height: 50,
    borderRadius: 20,
    
  },
  buttonText: {
    color: 'white',
    fontWeight: '400',
    // letterSpacing: 2,
    fontSize:18
  },
  selectedText:{color:'grey'},
  hyperlink: {
    alignItems: 'flex-end',
    marginVertical:2,
    marginHorizontal: 20,
    // backgroundColor:'lightgreen'
  },
  hyperlinkText: {
    color: '#B48D56' ,fontStyle:'italic',textDecorationLine:'underline',fontSize:15,
    paddingTop: 10
  },
  hyperlinkWithText: {
    display: 'flex',
    flexDirection: "row",
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingTop:20,
    // backgroundColor:'red',
  },
  //----------------------------------HOME PAGE CSS --------------------------------------------
  mainContainer: {
    height: Dimensions.get("screen").height,
    width: Dimensions.get("screen").width,
    // margin:10,
    padding:10,
  
    backgroundColor:'#f2ebd5',
    // backgroundColor:'skyblue',
  },

  newArrivalText: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    // backgroundColor:'green'
  },

  headerText: {
    //  margin:10,
    // paddingLeft:10,
    // height: 25,
    // left: 23.95,
    fontFamily: 'Baskerville-Italic',
    fontSize: "italic",
    fontWeight: "400",
    fontSize: 20,
    color: '#6D6D6D',
    //  backgroundColor:'green',         
  },
  headerMiddleTextContainer: {
    width:'100%',
    // padding: 20,
    display:'flex',
    flexDirection:'row',
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor:'red',
    padding:5,
    paddingBottom:20,
  },
  profileIconContainer:{
    // backgroundColor:'white',
    justifyContent:'center',
    alignItems:'center',
    // width:'100%'
  },
  headerMiddleText: {
    fontFamily: 'Baskerville-Italic',
    fontSize: "italic",
    fontWeight: "400",
    fontSize: 20,
    color: '#6D6D6D',
  },
  headerTextContainer: {
    marginTop: 20,
    display: 'flex',
    // backgroundColor:'blue',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft:15
  },

  allText: {
    marginRight: 10,
    fontFamily: 'Baskerville',
    fontWeight: "400",
    fontSize: 20,
    color: '#6D6D6D',
  },
  bannerContainer: {



  },

  banner: {
    width: 340,
    height: 135,
    margin: 10,
    padding: 10,
    borderRadius: 12,
  },
  arrivalImage: {
    left: 2,
    width: 95,
    height: 95,
    marginLeft: 0,
    borderRadius: 10
  },
  popularImage: {
    width: 103,
    height: 103,
    marginLeft: 0,
    borderRadius: 10,

  },
  squareProductContainer: {
    justifyContent: 'flex-start',
    flex: 1,
    flexDirection: 'row',
    marginVertical: 20,
    padding: 10,
    flexWrap: 'wrap',
    // backgroundColor: 'red'

  },
  singleProductContainer: {
    // backgroundColor: 'green',
    margin: 4,
    width: 104,
  },
  squareImageContainer: {
    // backgroundColor:'skyblue',
    width: 104,
  },
  follow: {
    width: 500,
    height: 25,
    left: 23.95,
    marginTop: 20,
    fontFamily: 'Baskerville-Italic',
    fontSize: "italic",
    fontWeight: "400",
    fontSize: 20,
    color: '#6D6D6D',
  },
  fotter: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    paddingBottom:Dimensions.get('screen').width/3,
    width:'100%',
    // marginBottom:  ,
    // backgroundColor:'red',
  },
  bannerImage: {
    width: Dimensions.get('screen').width/2.2,
    height: 280,
  },
  //------------------------------------------END HOME PAGE CSS-------------------------------------

  //-------------------------------------------START SIGN_UP CSS--------------------------------------
  welcomeText: {
    fontFamily: 'Georgia',
    fontSize: 26,
    color: '#3D3D3D',
    //  backgroundColor:'skyblue',
    marginVertical: 5,
  },
  welcomeContainer: {
    // display: 'flex',
    // flexDirection: 'row',
    // backgroundColor:'black',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  touchableSkip: {
    // backgroundColor:'green',
    marginHorizontal: 25,
  },
  touchableSkipText: {
    // backgroundColor:'red',
    fontSize: 18,
    color: '#B48D56',
    textDecorationLine: 'underline',
  },
  text: {
    fontSize: 14,
    fontFamily: 'PlayfairDisplay-Italic',
    // textAlignVertical:'center',
    // justifyContent:'center', 
    textAlign:'center',
    color: '#525355',
    width: '100%',
    marginVertical: 5,
  },
  normal2text: {
    fontSize: 16,
    fontFamily: 'PlayfairDisplay-Italic',
    // textAlignVertical:'center',
    // justifyContent:'center', 
    textAlign:'center',
    color: '#525355',
    width: '100%',
    marginVertical: 5,
  },
  normalText: {
    fontSize: 14,
    fontFamily: 'Georgia',
    // textAlignVertical:'center',
    // justifyContent:'center', 
    color: 'grey',
    width: '90%',
    marginVertical: 5,
  },
  welcomeTextContainer: {
    // backgroundColor:'lightgreen',
    justifyContent:'center',
    alignItems:'center',
    margin: '4%',
  },


  // -------------------------------------------------END OF SIGN_UP CSS----------------------------

  // -------------------------------------------Globle css----------------------------------------------

  searchButton:{
    // backgroundColor: 'blue',
    padding:10
  },


  searchBar: {
    margin: 20,
    backgroundColor: '#F2F3F2',
    // backgroundColor:'lightgreen',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    width: '90%',
    marginLeft: '5%',
    borderTopLeftRadius: 5,
    justifyContent: 'space-around'
  },

  searchBarFilter:{
    marginTop:-20,
    backgroundColor: 'transparent',
    
    // backgroundColor:'#',
    width: '90%',
    marginLeft: '5%',
   borderRadius:5
    // borderWidth:2
  },

  searchIcon: {
    marginVertical: 25,
    backgroundColor: '#F2F3F2',
    borderRadius: 15,
  },

  textField: {
    width: '80%',
    // backgroundColor:'red'
  },


  carosalSlide: {
    paddingVertical: 10,
    width: '100%',
    // backgroundColor:'lightgreen',
  },

  categoryImageContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    // backgroundColor:'grey',
  },
  imageTextContainer: {

    // justifyContent: 'center',
    // alignContent:'space-around',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    margin: 3,
    // height: 160,
    width: 96,
    // backgroundColor:'red'
  },
  imageContainer: {
    height: 96,
    width: 96,
    // backgroundColor:'black', 
  },
  textContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%',
    // height: 80,
    // backgroundColor:'green',
    margin: 2
  },
  productTextContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 150,
    // height: 71,
    // backgroundColor:'green',
    marginHorizontal: 2
  },


  categoryImage: {
    width: 95,
    height: 95,
    borderRadius: 50,
  },

  categoryType: {
    justifyContent: 'center',
    textAlign: 'center',
    textAlignVertical: 'center',
    padding: 5,
    fontFamily: 'Baskerville',
    color: 'black',
    fontWeight: '400',
    fontSize: 12,
    width: '100%',
    // height: 40,
    // backgroundColor:'grey',
  },
  SquareProductText: {
    // backgroundColor: 'skyblue',
    width: 70,
    height: 40,
  },
  // -------------------------------------------Categories page css----------------------------------------------
  categoryHeaderContainer: {
    marginHorizontal: 10,
    marginVertical: 10,
  },
  underline: {
    backgroundColor: 'grey',
    height: 1,
    width: '95%',
    marginHorizontal: 5,

  },
  categoryHeaderText: {
    fontFamily: 'Baskerville-Italic',
    fontSize: "italic",
    fontWeight: "400",
    fontSize: 20,
    color: '#839D3C',
  },
  warpRoundImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    //  backgroundColor:'blue',

  },
  warpContainer: {
    // justifyContent: 'flex-start',
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 10,
    justifyContent:'space-evenly',
    // marginLeft: 10,
    width: "100%",
    // backgroundColor:'green',
  },
  warpProductContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 10,
    justifyContent:'center',
    paddingBottom:DeviceInfo.isTablet() ? 180:100,
    width: "100%",
    // backgroundColor:'green',
  },

  warpFlatlistContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 10,
    // justifyContent:'center',
    paddingBottom:DeviceInfo.isTablet() ? 180:100,
    width: "100%",
    backgroundColor:'green',
  },
  warpImageTextContainer: {
    // backgroundColor:'red',
    marginHorizontal: 5,
    marginVertical: 2,
    display: 'flex',
    flexDirection: 'column',
    // justifyContent: 'center',
    alignItems: 'center',
    // height: 150,
    width: 105,
  },
  warpImageContainer: {
    backgroundColor: '#839D3C',
    width: 103,
    height: 103,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  //--------------------------------------------- product page -------------------------------------------------------------------------------
  productHeaderText: {
    margin: 5,
    padding: 5,
    fontFamily: 'Baskerville',
    fontWeight: "400",
    fontSize: 20,
    color: '#839D3C',
  },
  productContainer: {
    width: 151,
    // height: 241,
    // backgroundColor:'red',
    margin: 8,
    display: 'flex',
    flexDirection: 'column',
    // justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    borderWidth: 0.5,
    borderColor: '#706c62'

  },
  productImageContainer: {
    height: 150,
    width: 150,
    marginTop:0,
    // backgroundColor:'skyblue',
  },
  productImage: {
    height: 149,
    width: 149,
    borderRadius: 17,
    backgroundColor:'#f2ebd5'
  },
  priceContainer: {
    // backgroundColor:'blue',
    width: 150,
    // height: 40,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    // marginVertical: 2,
    marginHorizontal:5,
    alignItems:'center',
    padding: 5,
  },
  addButton: {
    backgroundColor: '#B48D56',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    padding:5,
    // height: 30,
    // width: 30,
  },
  priceText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'black',
    textAlign:'center',
    textAlignVertical:'center',
    fontFamily: 'Baskerville'
  },
  productText: {
    justifyContent: 'center',
    textAlign: 'center',
    padding: 5,
    fontFamily: 'Georgia',
    color: 'black',
    fontWeight: '400',
    fontSize: 16,
    width: 150,
    // height: 40,
    // backgroundColor:'green',
  },
  addButtonText: {
    textAlign: 'center',
    alignContent: 'center',
    color: 'white',
    // height: 30,
    // width: 30,
    // lineHeight: 30,
    borderRadius: 10
  },
  //-------------------------------------------------------end product page ----------------------------------------------------------------------
  //-------------------------------------------------------start homeaccents page ----------------------------------------------------------------------

  parentContainer: {
    paddingBottom:Dimensions.get('window').width/2,
    // marginTop:20,
    // marginBottom:30,
    // backgroundColor:'lightgreen',
    justifyContent:'center',
    alignItems:'center'
  },
  productProfileContainer: {
    // backgroundColor: 'red',
  },
  selectContainer: {
    justifyContent: 'center',
    width: 330,
    // marginHorizontal: 15,
    marginVertical: 5,
    // backgroundColor: 'red'
  },
  selectList: {
    marginVertical: 5,
  },
  selectListHeader: {
    // backgroundColor:'white',
    marginVertical: 10,
    textAlignVertical: 'center',
    color: 'black',
    fontSize: 15,
    fontFamily: 'Georgia'

  },
  homeAccentContainer: {
    // backgroundColor:'lightgreen',
    width: '100%',
    // marginHorizontal: 15,
    marginVertical: 5,
  },
  homeAccentImageContainer: {
    // backgroundColor:'red',
    width: '100%',
    // height: 250,
  },
  homeAccentImage: {
    width: '100%',
    height: Dimensions.get("screen").height/2.5,
  },
  homeAccentTextContainer: {
    // backgroundColor:'skyblue',
    width: '100%',
    padding: 5,
  },
  homeAccentText: {
    // backgroundColor:'white',
    width: '100%',
    fontSize: 14,
    padding:3,
    fontFamily: 'Georgia',
    marginLeft: 0,
    textAlignVertical: 'center',
    color: 'black',
  },
  productProfilePrice: {
    // backgroundColor:'red',
    width: '100%',
    fontSize: 16,
    // marginLeft: 0,
    padding: 3,
    fontFamily: 'Georgia',
    textAlignVertical: 'center',
    color: '#801426',
    fontWeight: '500',
  },
  trayStyleContainer: {
    width: '100%',
    padding: 5,
    // backgroundColor:'red',
    borderWidth: 1,
    borderColor: '#EAD3B9',
  },
  noteContainer: {
    width: '100%',
    padding: 5,
    // backgroundColor:'red',
    borderWidth: 1,
    marginBottom:120,
    borderColor: '#EAD3B9',
  },
  headerTrayStyle: {
    // backgroundColor:'lightgreen',
    width: '100%',
    height: 20,
    // padding: 10,
    textAlignVertical: 'center',
    color: 'black'
  },
  trayStyleChildContainer: {
    // backgroundColor:'grey',
    width: '100%',
    paddingHorizontal: 10,
    paddingVertical: 3,
  },
  trayStyleChild: {
    // backgroundColor:'white',
    width: '100%',
    margin: 1,
    flexWrap: 'wrap',
    flexDirection: 'row',
    marginVertical: 5
  },
  
  trayStyleChildText: {
    // backgroundColor:'skyblue',
    color: 'black',
    fontSize: 10,
    textAlignVertical: 'center',
    textAlign: 'center',
    
  },
  trayStyleChildSizeText: {
    // backgroundColor:'skyblue',
    color: 'black',
    fontSize: 10,
    textAlignVertical: 'center',
    textAlign: 'center',
    width: 95,
    height: 30,
    margin: 2,
    borderWidth: 0.5,
    borderRadius: 15,
    borderColor: '#EAD3B9',
  },
  incDecContainer: {
    // backgroundColor:'green',
    width: 330,
    margin: 5,
    display: 'flex',
    flexDirection: 'row',
  },
  incDecArea: {
    borderBottomWidth: 2,
    borderTopWidth: 2,
    borderColor: '#CEBCA3',
    width: 40,
    height: 35,
    textAlign: 'center',
    textAlignVertical: 'center',
    color: 'black'
  },
  incButton: {
    textAlign: 'center',
    textAlignVertical: 'center',
    color: 'black',
    lineHeight: 30,
  },
  decButton: {
    color: 'black',
    textAlign: 'center',
    textAlignVertical: 'center',
    lineHeight: 30
  },
  decPress: {
    borderWidth: 2,
    borderColor: '#CEBCA3',
    width: 50,
    backgroundColor: '#F3EADC',
    borderBottomLeftRadius: 40,
    borderTopLeftRadius: 40,

  },
  incPress: {
    width: 50,
    borderWidth: 2,
    borderColor: '#CEBCA3',
    backgroundColor: '#F3EADC',
    borderBottomRightRadius: 40,
    borderTopRightRadius: 40,
  },
  quantityAndIncDecContainer: {
    // backgroundColor:'lightgreen',
    margin: 5,
  },
  quantityText: {
    color: 'black',
    fontSize:11,
   
    fontFamily: 'Georgia',
  },
  cartButtonContainer: {
    // position:'relative',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 10,
    width: '100%',
    // padding: 10,
    display: 'flex',
    flexDirection: 'row',
    // backgroundColor:'red'

  },
  cartbutton: {
    backgroundColor: '#B48D56',
    width: Dimensions.get("screen").width/1.3,
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    borderRadius: 20,
    // marginRight:25,
    // marginLeft:10,
  },
  overViewAndShippingPolicyContainer: {
    // backgroundColor:'red',
    // marginHorizontal: 15,
    display:'flex',
    marginVertical: 5,
    justifyContent:'center',
    alignItems:'center',
    flexDirection:'column',
  },
  overViewContainer: {
    width:'100%',
    backgroundColor: '#F3EADC',
    marginVertical: 7,
    marginHorizontal: 10,
    display: 'flex',
    flexDirection: 'row',
    borderRadius: 4,

  },
  shippingPolicyContainer: {
    width:'100%',
    backgroundColor: '#F3EADC',
    marginVertical: 7,
    marginHorizontal: 10,
    display: 'flex',
    flexDirection: 'row',
    borderRadius: 4,
  },
  overViewText: {
    // backgroundColor:'white',
    color: 'black',
    marginLeft: 10,
    width: '85%',
    height: 35,
    textAlignVertical: 'center',
    fontFamily: 'Georgia',
  },
  pText: {
    // backgroundColor:'white',
    color: 'black',
    // marginLeft: 150,
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 20,
    width:40
  },
  accordianContainer: {
    // backgroundColor:"skyblue",
    display: 'flex',
    flexDirection: 'column'
  },
  accordianParagraph: {
    // backgroundColor:'green',
    marginVertical: 15,
    marginHorizontal: 13,
    color: 'black'
  },
  accordianText: {
    // backgroundColor:'white',
    color: 'black',
    marginHorizontal: 13,
    marginVertical: 5
  },
  loadingTextStyle: {
    color: '#B48D56',
    fontFamily: 'PlayfairDisplay-Italic'
  },
  loadingScreen: {
    // backgroundColor: '#f2ebd5',
    // backgroundColor:'skyblue',
    // height: Dimensions.get("screen").height,
    // width: Dimensions.get("screen").width,
    justifyContent:'center',
    alignItems: 'center',
  },
  stackNavigationLoadingScreen: {
    backgroundColor: '#f2ebd5',
    height: Dimensions.get("screen").height,
    width: Dimensions.get("screen").width,
    marginTop:330,
    alignItems: 'center',
  },
  navigationLoadingScreen: {
    backgroundColor: '#f2ebd5',
    height: Dimensions.get("screen").height,
    width: Dimensions.get("screen").width,
    marginTop:350,
    alignItems: 'center',
  },
  noteText:{
    fontStyle:'italic',
    margin: 10,
    // marginBottom:120,
    textAlignVertical: 'center',
    color: '#6D6D6D'
    
  },
//-------------------------------------------------------end homeaccents page ----------------------------------------------------------------------
//-------------------------------------------------------Start cart page ----------------------------------------------------------------------
cartHeaderTextContainer: {
  // backgroundColor:'red',
  // marginHorizontal:5,
  marginVertical: 10,
  justifyContent: 'center',
  alignItems: 'center',
  width: 350,
  // height:60,
},
cartHeaderText: {
  color: 'black',
  fontSize: 23,
  fontWeight: '500'
},
cartProductContainer: {
  // backgroundColor:'blue',
  // marginHorizontal:15,
  // justifyContent:'center',
  alignItems:'center',
  marginVertical: 5,
  width: '100%',
  display: 'flex',
  flexDirection: 'row',
  borderBottomWidth: 1,
  paddingHorizontal:15,
  
  // paddingBottom:200,
  borderBottomColor: '#bba890'
},
cartImageContainer: {
  // backgroundColor:'green',
  width: Dimensions.get("screen").width/4,
  height: Dimensions.get("screen").height/7.3,
  paddingVertical: 10,
  paddingHorizontal: 5,
  justifyContent:'center',
  alignItems:'center'
},
cartImage: {
  width: Dimensions.get("screen").width/5,
  height: Dimensions.get("screen").height/8.3,
  borderRadius: 10,
},
contentContainer: {
  // backgroundColor:'grey',
  display: 'flex',
  flexDirection: 'column',
  marginVertical: 10,
  width: Dimensions.get("screen").width/1.42,
},
navContainer: {
  // backgroundColor:'grey',
  width: '90%',
  display: 'flex',
  flexDirection: 'column',
  marginVertical: 10,
  // width: DeviceInfo.isTablet() ? Dimensions.get("screen").width/1.42:Dimensions.get("screen").width/1.7,
  padding:10
},
navParentContainer:{
  // backgroundColor:'red',
  padding:2,
  width: DeviceInfo.isTablet() ? Dimensions.get("screen").width/1.41:Dimensions.get("screen").width/1.5,
  display:'flex',
  flexDirection:'row',
  justifyContent:'space-between',
  alignItems:'center'
},
cartTextContainer: {
  // backgroundColor:'skyblue',
  // marginHorizontal: 5,
  // width: '70%',
  justifyContent: 'center',
  alignItems: 'center'
},
cartText: {
  // margin: 2,
  // marginLeft: 2,
  padding:5,
  color: '#3d3d3d',
  fontFamily: 'Baskerville',
  fontSize:13,
  width: '100%',
  // height:70,
  // textAlign:"center",
  textAlignVertical: "center",
  // backgroundColor:'white',
},
wishlistPriceText:{
  padding:5,
  color: '#3d3d3d',
  fontFamily: 'Baskerville',
  textAlignVertical: "center",
},
addressText: {
  // margin: 2,
  // marginLeft: 2,
  padding:5,
  color: 'black',
  // fontFamily: 'Georgia',

  // width: '30%',
  // height:70,
  // textAlign:"center",
  textAlignVertical: "center",
  // backgroundColor:'grey',
},
helpText:{
  color:'black',
  fontFamily:'Georgia'
},
contactUs:{
  color:'black',
  fontFamily:'Georgia'
},
cartModelText: {
  // margin: 2,
  // marginLeft: 2,
  padding:5,
  color: '#6D6D6D',

  fontSize: 11,  
  width: '100%',
  // height:70,
  // textAlign:"center",
  textAlignVertical: "center",
  // backgroundColor:'white',
},

cartPriceAndQuantityContainer: {
  // backgroundColor:'skyblue',
  width: 210,
  // height: 40,
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-evenly',
  // marginVertical: 2,
  marginHorizontal: 5,
  alignItems: 'center',
  padding: 2,
},
cartQuantityAndIncDecContainer: {
  // backgroundColor:'grey',
  marginVertical: 5,
  width: 110,
},
cartPriceText: {
  fontSize: 11,
  fontWeight: '500',
  color: 'black',
  textAlign: 'center',
  textAlignVertical: 'center',
  fontFamily: 'Baskerville'
},

cartIncDecArea: {
  borderWidth: 1,
  borderRadius: 12,
  borderColor: '#CEBCA3',
  width: 30,
  height: 35,
  textAlign: 'center',
  textAlignVertical: 'center',
  lineHeight: 35,
  color: 'black'
},

cartDecPress: {
  borderWidth: 2,
  borderColor: '#CEBCA3',
  width: 40,
  backgroundColor: '#F3EADC',
  borderRadius: 12

},
cartIncPress: {
  width: 40,
  borderWidth: 2,
  borderColor: '#CEBCA3',
  backgroundColor: '#F3EADC',
  borderRadius: 12
},

cartTable: {
  width: '95%',
  borderColor: '#bba890',
  borderWidth: 1,
  marginTop: 20,
},

tableRow: {
  // height: 50,
  borderBottomColor: 'grey',
  // width: 330,
  marginHorizontal: 6,
  borderBottomWidth: 1
},
tableLastRow: {
  // borderBottomColor: 'grey',
  // width: 330,
  marginHorizontal: 6,
  // borderBottomWidth:1
},
incDecButtonContainer: {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginVertical:5,
  // backgroundColor: 'red'
},
incDecButtonContainerProfile: {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  // backgroundColor: 'red'
},
incDecButton: {
  marginLeft: 5,
  marginTop: 5
},
refDelButton: {
  justifyContent:'center',
  alignItems:'center',
  width:50,
  // backgroundColor:'red'
},

decBtn: {
  borderWidth: 1,
  borderColor: 'grey',
  width: 35,
  backgroundColor: '#FFFFFF',
  borderRadius: 5,
  // borderBottomLeftRadius: 40,
  // borderTopLeftRadius: 40,

},
incBtn: {
  width: 35,
  borderWidth: 1,
  borderColor: 'grey',
  backgroundColor: '#FFFFFF',
  borderRadius: 5,
  fontSize: 18
  // borderBottomRightRadius: 40,
  // borderTopRightRadius: 40,
},
incDecField: {
  borderColor: '#780000',
  width: 30,
  fontSize: 16,
  fontWeight: 'bold',
  height: 35,
  lineHeight: 35,
  textAlign: 'center',
  textAlignVertical: 'center',
  color: 'black'
},

cartIncDecContainer: {
  margin: 5,
  display: 'flex',
  flexDirection: 'row',
  // backgroundColor:'red'
},

//-------------------------------------------------------end cart page ----------------------------------------------------------------------
//-------------------------------------------------------start profile page ----------------------------------------------------------------------
  profileNameContainer:{
    // justifyContent:'center',
    alignItems:'center',
    display:'flex',
    flexDirection:'row',
    // backgroundColor:'white',
    margin:3
  },
  profileUserName:{
    // backgroundColor:'green',
    textAlignVertical:'center',
    fontFamily:'Baskerville',
    fontSize:23,
    color:'#6D6D6D'
    // marginHorizontal:15
  },
  profileNameAndEmailContainer:{
    // backgroundColor:'skyblue',
    justifyContent:'center',
    alignItems:'center',
    marginHorizontal:5,
  },
  profileEmailText:{
    // backgroundColor:'green',
    textAlignVertical:'center',
    fontFamily:'Baskerville',
    fontSize:14,
    color:'#6D6D6D'
    // marginHorizontal:15
  },
  profileEmailContainer:{
    // justifyContent:'center',
    alignItems:'center',
    // backgroundColor:'white',
    margin:3
  },
  
  profileHeadings:{
    alignItems:'center',
    flexDirection:'row',
    display:'flex',
  },
  profileHeadingText:{
    textAlignVertical:'center',
    marginLeft:15,
    color:'#6D6D6D',
    width:DeviceInfo.isTablet()?Dimensions.get('screen').width/2.3: Dimensions.get('screen').width/2.6,
    fontFamily:'Baskerville',
    fontSize:16,
    // backgroundColor:'red'
  },
  rowStyles:{
    borderBottomColor:'#bba890',
    borderBottomWidth:1
  },
  rowStylesBottom:{
    // borderColor:'#bba890',
    borderBottomColor:'#bba890',
    borderBottomWidth:1
  },
  profileIcons:{
    paddingLeft:DeviceInfo.isTablet()?Dimensions.get('screen').width/2.3: Dimensions.get('screen').width/2.6,
    // backgroundColor: 'blue'
    
  },
  profileHeaderMiddleText: {
    fontFamily: 'Baskerville-Italic',
    fontSize: "italic",
    fontWeight: "400",
    fontSize: 15,
    color: '#6D6D6D',
  },
  dataTable:{
    // backgroundColor:'grey',
    padding:20,
    width:'100%'
  },
  dataTable_2:{
    // backgroundColor:'grey',
    // padding:20,
    width:'100%'
  },
  tableRow:{
    // justifyContent:'center',
    // alignItems:'center',
  },
  tableColumnInput:{
    // backgroundColor:'green',
    // width:'',
    marginLeft:DeviceInfo.isTablet() ? 130 : 20,
    justifyContent:'center',
  },
  tableColumnFeilds:{
    // backgroundColor:"white",
    // color:'black',
    fontSize:11,
    width:115,
    justifyContent:'center',

    // backgroundColor:'red'
  },
  tableDoubleColumnLable:{
    color:'#6d6d6d',
    fontSize:15,
  },
  tableDoubleColumnText:{
    color:'#3d3d3d',
    fontSize:15,
    fontWeight:'600',
    width:Dimensions.get('screen').width/2.2,
    // backgroundColor:'red'
  },
  tableColumnTextInput:{
    color:'#5c5858',
    fontSize:11,
    borderWidth:0,
    width:Dimensions.get('screen').width/2.2,
    height:35,
    borderRadius:15,
    // borderColor:'lightgrey'
    // lineHeight:40
  },
  tableDoubleColumnDecoratedText:{
    fontSize:11,
    color:"#CEBCA3",
    textDecorationLine:'underline'
  },
  opacityText:{
    width:90,
    height:40,
    justifyContent:'center',

    // backgroundColor:'red'
  },
  aboutTextContainer:{
    width:'100%',
    marginVertical:10,
    justifyContent:'center',
    alignItems:'center'
  },
  aboutText:{
    color:'white',
    fontFamily:'Georgia'
  },
  aboutHeaderMiddleText:{
    color:'black',
    textAlign:'center',
    fontFamily:"Baskerville",
    fontSize:14,
  },
  aboutHeaderMiddleTextContainer:{
    width:'100%',
    justifyContent:'center',
    alignItems:'center',
  },

  mainHeading: {
    fontSize: 30,
    fontWeight: 'bold',
    // fontFamily: 'Gloock-Regular',
    justifyContent: 'center',
    textAlign: 'center'
  },
  inputFields: {
    width: 330,
    margin: 20,
    backgroundColor: 'transparent',
    borderBottomColor: 'brown',
    borderBottomWidth: 1,
    fontSize: 20,
    padding: 10
  },
  selectImageButton: {
    // margin: 20,
    marginTop:20,
    marginLeft:18,
    backgroundColor: '#780000',
    width: 160,
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10
  },

  // ---------------------------------------forgot passsword ----------------------------
  iconContainer:{
    justifyContent:'center',
    alignItems:'center',
    width:'100%',
    padding:10,
    // backgroundColor:'skyblue'
  },
  icon: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    // backgroundColor:'skyblue'
  },
  info_text_container: {
    marginTop: 15,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  info_text: {
    fontFamily: 'Baskerville-Italic',
    fontSize: 20
  },
  centre_heading_container: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 300,
    left: 40,
    // backgroundColor: 'blue'
  },
  mail_text: {
    fontSize: 18,
    fontFamily: 'Baskerville-Italic',

  },
  verfyCode: {
    margin: 20,
    width: 200,
    // backgroundColor: 'red',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'

  },
  textInput: {
    // backgroundColor: 'yellow', 
    margin: 6,
    width: 40,
    height: 50,
    borderWidth: 2,
    borderColor: '#6D6D6D',
    borderRadius: 6,
    fontSize: 20,
    paddingLeft: 13
  },
  resendText: {
    fontSize: 18,
    marginTop: 16,
    marginBottom: 20,
    color: 'blue'
  },
  new_text: {
    marginTop: 8,
    fontSize: 18,
    fontFamily: 'Baskerville-Italic',
    textAlign:'center'
  },
//---------------------------------------------------------------------order list page
  orderContainer: {
  width: Dimensions.get("screen").width/4,
  height: Dimensions.get("screen").height/7.3,
  paddingVertical: 10,
  paddingHorizontal: 5,
  justifyContent:'center',
  alignItems:'center',
  backgroundColor:'lightgrey',
  borderRadius:7
   
    
  },
  orderHeadingText: {
    // margin: 2,
    // marginLeft: 2,
    padding:5,
    color: '#3d3d3d',
    fontFamily: 'Baskerville',
    fontSize:13,
    width: '100%',
    fontWeight:"700",
    // height:70,
    // textAlign:"center",
    textAlignVertical: "center",
    // backgroundColor:'white',
  },
  orderText: {
    margin: 2,
    marginLeft: 2,
    color: 'black',
   fontWeight:'bold',
    fontSize:18,
    width: 200,
   
    textAlignVertical: "center",
    
  },
  invoiceTableView:{ 
    justifyContent: 'center',
    width:200
  },
  invoiceTableText:{
    fontSize: 14, 
    fontWeight: 'bold', 
    textAlign: 'center',
    color:'black' 
  },
//_____________________________________________________________________ end order list page _______________________________________
//--------------------------------------------------------------------- start Address Book -----------------------------------------
  addressChildContainer:{
    width: "100%",
    borderWidth: 1,
    borderColor: '#c59a6a',
    justifyContent: 'center',
    alignItems:'center',
    marginVertical:20,
    // backgroundColor:'green'
},

addressParentContainer:{
  width: "100%",
  // backgroundColor:'green',
  justifyContent: 'center',
  alignItems:'center',
  padding: 20,
  // paddingBottom:Dimensions.get('screen').height/3,
},
trackOrderContainer:{
  width: "100%",
  borderWidth: 1,
  borderColor: '#c59a6a',
  
  marginVertical:20,
  // backgroundColor:'green'
},
addressButton:{
  // textDecorationLine:'underline', 
  textAlign:'center',
  color:'#fff',
  fontSize:18,
  fontWeight:'600'
},
creditsText:{
  color:'#3d3d3d',
  fontSize:16,
  // fontWeight:'',
  textAlign:'center',
  textAlignVertical:'center',
  // backgroundColor:'red'
  
},
creditsTableText:{
  color:'#3d3d3d',
  width:Dimensions.get('screen').width/3.2,
  textAlign:'center',
  // margin:2,
  textAlignVertical:'center',
  fontSize:13,
  fontFamily:"Baskerville",
},
trackOrderTableText:{
  color:'#3d3d3d',
  width:Dimensions.get('screen').width/4.2,
  textAlign:'center',
  // margin:2,
  textAlignVertical:'center',
  fontSize:13,
  fontFamily:"Baskerville",
},
creditsTableHeaderText:{
  color:'black',
  width:Dimensions.get('screen').width/3.2,fontWeight:'bold',
  textAlign:'center',
  textAlignVertical:'center',
  // backgroundColor:'red',
},
creditTableRow:
  {
    // backgroundColor:'grey',
    borderBottomColor:"#BBA890",
    // borderTopColor:'#BBA890',
    // borderTopWidth:1,
    borderBottomWidth:2,
    height:70
 },
 creditTableRowView:{
    // backgroundColor:'green',
    display:'flex',
    flexDirection:'row',
    alignItems:'center'
  },
 //_____________________________________________________________________ end addressbook page _______________________________________
 activityIndicator: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  height: 80
},
//-------------------------------------------------------------------Add address page------------------------------------------------
 radioButtons:{
  color:'#6d6d6d',
 },
 defaultAddress:{
    color:'#6d6d6d',
    fontSize:13,

 }

})
