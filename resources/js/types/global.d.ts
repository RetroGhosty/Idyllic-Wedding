import { AxiosInstance } from 'axios';
import ziggyRoute, { Config as ZiggyConfig } from 'ziggy-js';

declare global {
    interface Window {
        axios: AxiosInstance;
    }

    var route: typeof ziggyRoute;
    var Ziggy: ZiggyConfig;
}

interface BoxIconElement {
    name: string;
  }


export declare global {
  namespace JSX {
    interface IntrinsicElements {
      "box-icon": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement, BoxIconElement>,
        HTMLElement
      >;
    }
  }
}
