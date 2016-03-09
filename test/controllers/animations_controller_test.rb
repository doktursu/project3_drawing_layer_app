require 'test_helper'

class AnimationsControllerTest < ActionController::TestCase
  setup do
    @animation = animations(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:animations)
  end

  test "should create animation" do
    assert_difference('Animation.count') do
      post :create, animation: { canvasJSON: @animation.canvasJSON, frameInterval: @animation.frameInterval, frameOrder: @animation.frameOrder, layerInfo: @animation.layerInfo, layerOrder: @animation.layerOrder }
    end

    assert_response 201
  end

  test "should show animation" do
    get :show, id: @animation
    assert_response :success
  end

  test "should update animation" do
    put :update, id: @animation, animation: { canvasJSON: @animation.canvasJSON, frameInterval: @animation.frameInterval, frameOrder: @animation.frameOrder, layerInfo: @animation.layerInfo, layerOrder: @animation.layerOrder }
    assert_response 204
  end

  test "should destroy animation" do
    assert_difference('Animation.count', -1) do
      delete :destroy, id: @animation
    end

    assert_response 204
  end
end
