class HelperMethods {

    static TransformValueToNumber(value) {
       switch(value) {
            case 'ACE' :
                return 14;
            case 'JACK': 
                return 11;
            case 'QUEEN' :
                return 12;
            case 'KING' :
                return 13;
            default :
                return Number(value)
        }
    }
}

export default HelperMethods;