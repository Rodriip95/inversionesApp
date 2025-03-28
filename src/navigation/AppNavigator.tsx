import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../views/screens/HomeScreen";
import PortfolioScreen from "../views/screens/PortfolioScreen";
import RequestScreen from "../views/screens/RequestScreen";
import { ActivosObjType, TypeResponseOrder } from "../types/types";
import PortfolioDetailScreen from "../views/screens/PortfolioDetailScreen";

export type RootStackParamList = {
    HomeScreen: undefined;
    PortfolioScreen: undefined;
    RequestScreen: {
      data: TypeResponseOrder | null
    };
    PortfolioDetailScreen: {
      activo: ActivosObjType
    }
};

export enum EnumScreens {
  HOME_SCREEN= "HomeScreen",
  PORTFOLIO_SCREEN= "PortfolioScreen",
  REQUEST_SCREEN= "RequestScreen",
  PORTFOLIO_DETAIL= "PortfolioDetailScreen",
}

const Stack = createNativeStackNavigator<RootStackParamList>();

function RootStack() {
  return (
    <Stack.Navigator initialRouteName="HomeScreen">
      <Stack.Screen name={EnumScreens.HOME_SCREEN} component={HomeScreen} options={{
        headerShown: false
      }}/>
      <Stack.Screen name={EnumScreens.PORTFOLIO_SCREEN} component={PortfolioScreen} options={{
        headerShown: false
      }}/>
      <Stack.Screen name={EnumScreens.REQUEST_SCREEN} component={RequestScreen} options={{
        headerShown: false
      }}/>
      <Stack.Screen name={EnumScreens.PORTFOLIO_DETAIL} component={PortfolioDetailScreen} options={{
        headerShown: false
      }}/>
    </Stack.Navigator>
  );
}

export default RootStack;
