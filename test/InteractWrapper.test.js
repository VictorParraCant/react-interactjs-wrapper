import React from 'react'
import { shallow, mount } from 'enzyme'
import sinon from 'sinon'

import InteractWrapper from '../src/InteractWrapper'
import interact from 'interact.js'

const sandbox = sinon.sandbox.create()

describe('InteractWrapper', () => {
	let result

	afterEach(() => {
		sandbox.restore()
	})

	context('without children', () => {
		it('errors', () => {
			expect(function() {
				mount(<InteractWrapper />)
			}).to.throw
		})
	})

	context('with children', () => {

		beforeEach(() => {
			result = shallow(<InteractWrapper><h1 /></InteractWrapper>)
		})

		it('does not error', () => {
			expect(function() {
				mount(<InteractWrapper><div /></InteractWrapper>)
			}).not.to.throw
		})

		it('returns the children', () => {
			expect(result.find('h1')).to.have.length(1)
		})

		it('sets ref to child as this.node', () => {
			expect(result.node.type).to.equal('h1')
		})
	})

	describe('setInteractions', () => {
		beforeEach(() => {
			sandbox.spy(InteractWrapper.prototype, 'setInteractions')
		})

		describe('on componentDidMount', () => {
			beforeEach(() => {
				mount(<InteractWrapper><div /></InteractWrapper>)
			})

			it('calls setInteractions', () => {
				expect(InteractWrapper.prototype.setInteractions).to.have.been.calledOnce
			})
		})

		describe('on componentWillReceiveProps', () => {
			beforeEach(() => {
				const rendered = mount(<InteractWrapper><div /></InteractWrapper>)
				rendered.setProps({foo: 'bar'})
			})

			it('calls setInteractions', () => {
				expect(InteractWrapper.prototype.setInteractions).to.have.been.calledTwice // once on mount, once on update
			})
		})

		context('when draggable is true', () => {
			beforeEach(() => {
				result = mount(<InteractWrapper draggable><div /></InteractWrapper>)
				sandbox.stub(result.node.interact, 'draggable')
				result.setProps({draggable: true})
			})

			it('calls interact.draggable', () => {
				expect(result.node.interact.draggable).to.have.been.called
			})

			describe('when draggableOptions are provided', () => {
				let options

				beforeEach(() => {
					options = {
						foo: 'bar'
					}
					result = mount(<InteractWrapper draggable draggableOptions={options}><div /></InteractWrapper>)
					sandbox.stub(result.node.interact, 'draggable')
					result.setProps({draggable: true})
				})

				it('calls interact.draggable with draggableOptions', () => {
					expect(result.node.interact.draggable).to.have.been.calledWith(options)
				})
			})
		})

		context('when draggable is false', () => {
			beforeEach(() => {
				result = mount(<InteractWrapper><div /></InteractWrapper>)
				sandbox.stub(result.node.interact, 'draggable')
				result.setProps({draggable: false})
			})

			it('does not call interact.draggable', () => {
				expect(result.node.interact.draggable).not.to.be.called
			})
		})
	})

})
