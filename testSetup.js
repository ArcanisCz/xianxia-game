import chai from 'chai';
import chaiSinon from 'sinon-chai';
import dirtyChai from 'dirty-chai';
import chaiEnzyme from 'chai-enzyme';

chai.use(chaiEnzyme());
chai.use(dirtyChai);
chai.use(chaiSinon);
