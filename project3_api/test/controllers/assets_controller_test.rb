require 'test_helper'

class AssetsControllerTest < ActionController::TestCase
  setup do
    @asset = assets(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:assets)
  end

  test "should create asset" do
    assert_difference('Asset.count') do
      post :create, asset: { name: @asset.name, objects: @asset.objects }
    end

    assert_response 201
  end

  test "should show asset" do
    get :show, id: @asset
    assert_response :success
  end

  test "should update asset" do
    put :update, id: @asset, asset: { name: @asset.name, objects: @asset.objects }
    assert_response 204
  end

  test "should destroy asset" do
    assert_difference('Asset.count', -1) do
      delete :destroy, id: @asset
    end

    assert_response 204
  end
end
