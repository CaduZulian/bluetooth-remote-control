export interface ButtonPageProps {
  motorsIsOn: boolean;
  popupsHeadlightsIsOn: boolean;
  headlightIsOn: boolean;
  arrowsIsOn: boolean;
  setMotorsIsOn: (value: boolean) => void;
  setPopupsHeadlightsIsOn: (value: boolean) => void;
  setHeadlightIsOn: (value: boolean) => void;
  setArrowsIsOn: (value: boolean) => void;
  setCommand: (value: string) => void;
  setDirectionalCommand: (value: string) => void;
}

export interface NoButtonPageProps {
  rotation: number;
  motorsIsOn: boolean;
  popupsHeadlightsIsOn: boolean;
  headlightIsOn: boolean;
  arrowsIsOn: boolean;
  setMotorsIsOn: (value: boolean) => void;
  setPopupsHeadlightsIsOn: (value: boolean) => void;
  setHeadlightIsOn: (value: boolean) => void;
  setArrowsIsOn: (value: boolean) => void;
  setCommand: (value: string) => void;
}

export interface IButtonsActions {
  [key: string]: {
    pageX: number;
    pageY: number;
    width: number;
    height: number;
    onPressIn: () => void;
    onPressOut: () => void;
  };
}