import { useSelector } from "react-redux"
import { selectUser, setUser } from "../service/slice"
import { useAppDispatch } from "../../../store/store";
import { useLazySignInQuery, useLazySignUpQuery } from "../api/repository";
import { SignInOutDTO } from "../api/dto/sign-in.out";
import { SignUpOutDTO } from "../api/dto/sign-up.out";

export const useAuth = () => {
  const dispatch = useAppDispatch();

  const user = useSelector(selectUser);
  const isLoggedIn = Boolean(user);

  const [triggerSignInQuery] = useLazySignInQuery();
  const [triggerSignUpQuery] = useLazySignUpQuery();

  const signIn = async (values: SignInOutDTO['user']) => {
    const { data } = await triggerSignInQuery(values, false);
    if(!data) {
      throw new Error('No data in query');
    }
    dispatch(setUser(data.user));
  }

  const signUp = async (values: SignUpOutDTO['user']) => {
    const { data } = await triggerSignUpQuery(values, false);
    if(!data) {
      throw new Error('No data in query');
    }
    dispatch(setUser(data.user));
  }

  const logOut = () => {
    dispatch(setUser(null));
  }

  return { isLoggedIn, signIn, signUp, logOut };
}